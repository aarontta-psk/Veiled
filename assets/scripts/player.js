import Inventory from './inventory.js';

export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, spawnPoint) {
        super(world, x, y, 'player'); //llama a la constructora de Sprite
        this.setScale(0.8, 0.8); //reducimos la escala del sprite

        /*this.setBody({
            type: 'fromVertices',
            verts: [{ x: 5, y: 30 }, { x: 27, y: 30 }, { x: 27, y: 50 }, { x: 5, y: 50 }]
        });*/

        this.scene.add.existing(this); //lo añades en la escena
        this.scene.matter.add.sprite(this); //lo añado a las fisicas de Matter

        this.setFriction(0); //quitamos friccion
        this.setFrictionAir(0);
        this.setFixedRotation(0); //quitamos rotacion

        this.speed = 3; //velocidad

        this.sanity = 100; //cordura
        this.decay = 0.2; //velocidad base a la que pierde la cordura
        this.sanityLogThreshold = 20; //umbral a partir del cual aplicamos la pérdida logarítmica

        this.inventory = new Inventory();

        this.spawnPoint = { x: x, y: y };
        this.spawnBounds = [spawnPoint.properties[3].value, spawnPoint.properties[1].value,
        spawnPoint.properties[2].value, spawnPoint.properties[0].value]

        this.cursorsPlayer = this.scene.input.keyboard.addKeys({ //teclas de direccion
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            interact: Phaser.Input.Keyboard.KeyCodes.E,
            talk: Phaser.Input.Keyboard.KeyCodes.T,
            invToggle: Phaser.Input.Keyboard.KeyCodes.Q,
            blindfold: Phaser.Input.Keyboard.KeyCodes.SPACE,

            testing: Phaser.Input.Keyboard.KeyCodes.CTRL,
            pause: Phaser.Input.Keyboard.KeyCodes.ESC
        });
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta); //preUpdate de Sprite (necesario para animaciones)

        //Calculamos la velocidad
        let [velX, velY] = this.calculateVelocity();

        //Aplicamos la velocidad al cuerpo
        this.setVelocity(velX, velY);

        //Reproducimos la animación que corresponda
        this.changeAnims(velX, velY);

        //Actualizamos cordura
        this.updateSanity();
    }

    //Calculo de velocidad con respecto a input
    calculateVelocity() {
        let [velX, velY] = [0, 0];
        if (this.cursorsPlayer.up.isDown) { //arriba
            velY -= this.speed;
        }
        if (this.cursorsPlayer.down.isDown) { //abajo
            velY += this.speed;
        }
        if (this.cursorsPlayer.left.isDown) { //izquierda
            velX -= this.speed;
        }
        if (this.cursorsPlayer.right.isDown) { //derecha
            velX += this.speed;
        }

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

    //actualizacion de la cordura
    updateSanity() {
        //Ajustamos la cordura
        if (!this.scene.blindfold.blind) {
            if (this.sanity > this.sanityLogThreshold)
                this.sanity -= this.decay;
            else
                //Esta fórmula hace que la función sea derivable y el decay nunca baje por debajo del 10% del valor inicial
                this.sanity -= (this.decay * this.sanity / this.sanityLogThreshold) * 0.9 + this.decay * 0.1;
        }
        if (this.sanity < 0.1)
            this.die();
    }

    addSanity(sanityBoost){
        sanity += sanityBoost;
        if (sanity>100)
        sanity = 100;
    }

    //reaparicion tras muerte
    die() {
        this.setPosition(this.spawnPoint.x, this.spawnPoint.y);
        this.setVelocity(0, 0);

        this.scene.readjustTriggers();
        this.scene.cameras.main.setBounds(this.spawnBounds[0], this.spawnBounds[1], this.spawnBounds[2], this.spawnBounds[3]);
        this.scene.deathBlindfold();

        this.sanity = this.sanityLogThreshold;
    }
}