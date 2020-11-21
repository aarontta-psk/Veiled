export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player'); //llama a la constructora de Sprite
        this.setScale(0.8, 0.8); //reducimos la escala del sprite

        this.scene.add.existing(this); //lo añades en la escena
        this.scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(); //creamos limites fisicos
        this.body.allowGravity = false; //quitamos gravedad
        this.speed = 150; //velocidad

        this.cursorsPlayer = this.scene.input.keyboard.addKeys({ //teclas de direccion
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta); //preUpdate de Sprite (necesario para animaciones)

        if (this.cursorsPlayer.up.isDown) {
            this.body.setVelocityY(-this.speed);
            this.body.setVelocityX(0);
            this.scene.player.anims.play('up_move', true);
        }
        else if (this.cursorsPlayer.down.isDown) {
            this.body.setVelocityY(this.speed);
            this.body.setVelocityX(0);
            this.scene.player.anims.play('down_move', true);
        }
        else if (this.cursorsPlayer.left.isDown) {
            this.body.setVelocityY(0);
            this.body.setVelocityX(-this.speed);
            this.scene.player.anims.play('left_move', true);
        }
        else if (this.cursorsPlayer.right.isDown) {
            this.body.setVelocityY(0);
            this.body.setVelocityX(this.speed);
            this.scene.player.anims.play('right_move', true);
        }
        else {
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
            this.anims.play('idle', true);
        }
    }
}