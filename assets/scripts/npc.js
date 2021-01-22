import EventHandler from './event_handler.js'

//clase npc que puede moverse por el mapa y contiene una lista de eventos de texto
export default class Npc extends EventHandler {
    constructor(key, world, x, y, npcEvents, path, range) { 
        super(world, x, y, key, npcEvents); //hereda de eventHandler, contiene una lista de eventos de las clases eventScene 

        this.scene.add.existing(this); //se añade en la escena
        this.scene.matter.add.sprite(this); //se añade a matter

        this.sensor = Phaser.Physics.Matter.Matter.Bodies.circle(x, y, 70, { isSensor: true });
        let collision = Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 30, 50);
        //body compuesto con la colision del npc y su sensor para eventos
        let actualThing = Phaser.Physics.Matter.Matter.Body.create({
            parts: [this.sensor, collision]
        });
        this.setExistingBody(actualThing);

        //rango en el cual el npc es visible por el jugador
        this.range = range;

        //propiedades del body
        this.setFriction(0); //quitamos friccion
        this.setFrictionAir(0);
        this.setFixedRotation(0); //quitamos rotacion
        this.setMass(1000);

        this.path = path;   //array de puntos del recorrido tres valores: x, y, t(el tiempo de pausa cuando se llega al punto)
        this.nextPathPoint = 0;    //el indice del array de puntos del recorrido al que nos dirigimos siguiente

        this.state = 'moving';   //estados del movimiento: still, moving
        this.dest = { x: this.path[0].x, y: this.path[0].y }; //posicion inicial
        this.setVisible(false); //tiene que empezar invisible, porque la venda empezará puesta
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta); //preUpdate de Sprite (necesario para animaciones)       

        //si esta dentro del rango de vision, se hace visible
        if (this.scene.blindfold.blind) {
            if ((Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) < this.range))
                this.setVisible(true);
            else if ((Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) > this.range))
                this.setVisible(false);
        }

        //si esta en estado 'moiviendose', se mueve
        if (this.state === 'moving') {
            this.move();
        }
    }

    move() {
        let [velX, velY] = [0, 0];

        //si no ha llegado a su siguiente posicion
        if (Phaser.Math.Distance.Between(this.x, this.y, this.dest.x, this.dest.y) > 3) {
            //Calculamos la velocidad
            [velX, velY] = this.calculateVelocity();

            //Aplicamos la velocidad al cuerpo
            this.setVelocity(velX, velY);
        }
        else {
            //cambiamos el estado a 'parado'
            this.state = 'still';
            //cambiamos la velocidad
            this.setVelocity(0.01, 0.01);
            //paramos las particulas de los pasos
            if (this.footSteps != null)
                this.footSteps.emitter.stop();
            //cuando pase el tiempo de pausa, se establece el siguiente camino
            this.scene.time.delayedCall(this.path[this.nextPathPoint].pause, this.nextPath, null, this);
        }

        //Reproducimos la animación que corresponda
        this.changeAnims(velX, velY);
    }

    //metodo que cambia la siguiente posicion del npc y hace que comience a moverse hacia ella
    nextPath() {
        //ajustamos el siguiente posicion dentro de los limites del array de posiciones
        this.nextPathPoint++;
        this.nextPathPoint %= this.path.length;
        //establecemos el destino
        this.dest = { x: this.path[this.nextPathPoint].x, y: this.path[this.nextPathPoint].y };
        //cambiamos el estado a 'moviendose'
        this.state = 'moving';

        //iniciamos las particulas de los pasos
        if (this.scene.blindfold.blind === true && this.footSteps != null)
            this.footSteps.emitter.start();
    }

    //Calculo de velocidad con respecto a camino definido
    calculateVelocity() {
        let [velX, velY] = [0, 0];

        //Calculo de dirección al siguiente punto del recorrido
        velX = this.dest.x - this.x;
        velY = this.dest.y - this.y;

        //Normalizamos el vector
        let modulus = Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2));
        velX /= modulus;
        velY /= modulus;

        //devolvemos velocidad
        return [velX, velY];
    }

    //metodo que reproduce una animacion con respecto a la velocidad
    changeAnims(velX, velY) {
        if (velX === 0) {
            if (velY === 0)
                this.anims.play('idle_' + this.frame.texture.key, true);
            else if (velY < 0)
                this.anims.play('up_move_' + this.frame.texture.key, true);
            else
                this.anims.play('down_move_' + this.frame.texture.key, true);
        }
        else if (velX < 0) {
            if (velY > -velX)
                this.anims.play('down_move_' + this.frame.texture.key, true);
            else if (velY < velX)
                this.anims.play('up_move_' + this.frame.texture.key, true);
            else
                this.anims.play('left_move_' + this.frame.texture.key, true);
        }
        else {
            if (velY > velX)
                this.anims.play('down_move_' + this.frame.texture.key, true);
            else if (velY < -velX)
                this.anims.play('up_move_' + this.frame.texture.key, true);
            else
                this.anims.play('right_move_' + this.frame.texture.key, true);
        }
    }
}
