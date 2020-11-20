export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player'); //llama a la constructora de Sprite
        this.scene.add.existing(this); //lo añades en la escena
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(); //creamos limites fisicos
        this.body.allowGravity = false;
        this.speed = 50; //velocidad
        this.cursorsPlayer = this.scene.input.keyboard.addKeys({ //teclas de direccion
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    preUpdate() {
        if (this.cursorsPlayer.up.isDown) this.body.setVelocityY(speed);
        else if (this.cursorsPlayer.down.isDown) this.body.setVelocityY(-speed);
        else if (this.cursorsPlayer.left.isDown) this.body.setVelocityX(-speed);
        else if (this.cursorsPlayer.right.isDown) this.body.setVelocityX(speed);
        else {
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
        }
    }

    changeFrame(value) {
        switch (value) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }
}