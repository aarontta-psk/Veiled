import EventHandler from './eventHandler.js'

export default class Npc extends EventHandler{
    constructor(key, world, x, y, npcEvents, path) {
        super(world, x, y, key, npcEvents); //llama a la constructora de Sprite

        this.setBody({
            type: 'rectangle',
            width: 60,
            height: 60
        });
        this.scene.add.existing(this); //lo añades en la escena
        this.scene.matter.add.sprite(this);
        this.setStatic(false);
        this.setSensor(true);

        this.path = path;   //array de puntos del recorrido tres valores: x, y, t(el tiempo de pausa cuando se llega al punto)
        this.px = path.x;
        this.py = path.y;
        this.pathPause = path.pause;
        this.nextPathPoint = 0;    //el indice del array de puntos del recorrido al que nos dirigimos siguiente

        this.state = 'moving';   //still, moving
        this.dest = { x: this.px[this.nextPathPoint], y: this.py[this.nextPathPoint] };
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta); //preUpdate de Sprite (necesario para animaciones)

        if (this.state === 'moving') {
            this.move();
        }
    }

    move() {
        let [velX, velY] = [0, 0];

        if (Phaser.Math.Distance.Between(this.x, this.y, this.dest.x, this.dest.y) > 3) {
            //Calculamos la velocidad
            [velX, velY] = this.calculateVelocity();

            //Aplicamos la velocidad al cuerpo
            this.setVelocity(velX, velY);
        }
        else {
            this.state = 'still';
            this.setVelocity(0, 0);
            this.scene.time.delayedCall(this.pathPause[this.nextPathPoint], this.nextPath, null, this);
        }

        //Reproducimos la animación que corresponda
        this.changeAnims(velX, velY);

        /*console.log('NPC state: ' + this.state + 
        '\nSpeed: ' + velX + ', ' + velY + 
        '\nDestination(' + this.nextPathPoint + '): ' + this.dest.x + ', ' + this.dest.y +
        '\nPosition: ' + this.x + ', ' + this.y + 
        '\nDistance to destination: ' + (Phaser.Math.Distance.Between(this.x, this.y, this.dest.x, this.dest.y)));*/
    }

    nextPath() {
        this.nextPathPoint++;
        this.nextPathPoint %= this.path.x.length;
        this.dest = { x: this.px[this.nextPathPoint], y: this.py[this.nextPathPoint] };
        this.state = 'moving';
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

    //cambio de animacion con respecto a la velocidad
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
