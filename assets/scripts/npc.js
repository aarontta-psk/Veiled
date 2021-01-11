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
        this.nextPathPoint = 0;    //el indice del array de puntos del recorrido al que nos dirigimos siguiente

        this.state = 'moving';   //still, moving
        this.dest = { x: this.path[0].x, y: this.path[0].y };
        this.setVisible(false); //tiene que empezar invisible, porque la venda empezará puesta
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta); //preUpdate de Sprite (necesario para animaciones)

        if (this.scene.blindfold.blind)
        {
        if ((Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) < 60))
            this.setVisible(true);
        else if ((Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) > 60))
            this.setVisible(false);
        }

        if (this.state === 'moving') {
            this.move();
        }
        
        /*
        console.log('NPC state: ' + this.state + 
        //'\nSpeed: ' + velX + ', ' + velY + 
        '\nDestination(' + this.nextPathPoint + '): ' + this.dest.x + ', ' + this.dest.y +
        '\nPosition: ' + this.x + ', ' + this.y + 
        '\nPlayer position: ' + this.scene.player.x + ', ' + this.scene.player.y + 
        '\nDistance to player: ' + (Phaser.Math.Distance.Between(this.x, this.y, this.dest.x, this.dest.y)));*/
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
            this.setVelocity(0.01, 0.01);
            this.scene.time.delayedCall(this.path[this.nextPathPoint].pause, this.nextPath, null, this);
        }

        //Reproducimos la animación que corresponda
        this.changeAnims(velX, velY);
    }

    nextPath() {
        this.nextPathPoint++;
        this.nextPathPoint %= this.path.length;
        this.dest = { x: this.path[this.nextPathPoint].x, y: this.path[this.nextPathPoint].y };
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
