export default class NPC extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y) {
        super(world, x, y, 'npc'); //llama a la constructora de Sprite
        //this.setScale(0.8, 0.8); //reducimos la escala del sprite
        
        this.setBody({
            type: 'fromVertices',
            //verts: [{x: 5,y: 30},{x: 27,y: 30},{x: 27,y: 50},{x: 5,y: 50}]         
        });       

        this.scene.add.existing(this); //lo añades en la escena
        this.scene.matter.add.sprite(this); //lo añado a las fisicas de Matter
        
        this.setFriction(0); //quitamos friccion
        this.setFrictionAir(0);
        this.setFixedRotation(0); //quitamos rotacion

        this.speed = 4; //velocidad

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta); //preUpdate de Sprite (necesario para animaciones)

        //Calculamos la velocidad
        let [velX, velY] = this.calculateVelocity();

        //Aplicamos la velocidad al cuerpo
        this.setVelocity(velX, velY);

        //Reproducimos la animación que corresponda
        this.changeAnims(velX, velY);
    }

    //Calculo de velocidad con respecto a camino definido
    calculateVelocity() {
        let [velX, velY] = [0, 0];
        
        //Calculo de dirección al siguiente punto del recorrido
        //TO-DO

        //Normalizamos el vector
        if (velX != 0 && velY != 0) {
            velX /= Math.sqrt(2);
            velY /= Math.sqrt(2)
        }

        //devolvemos velocidad
        return [velX, velY];
    }

    //cambio de animacion con respecto a la velocidad
    changeAnims(velX, velY) {
        if (velX === 0) {
            if (velY === 0)
                this.anims.play('idle', true);
            else if (velY < 0)
                this.anims.play('up_move', true);
            else
                this.anims.play('down_move', true);
        }
        else if (velX < 0)
            this.anims.play('left_move', true);
        else
            this.anims.play('right_move', true);
    }
}