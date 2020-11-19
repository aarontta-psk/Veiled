export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player'); //llama a la constructora de Sprite
        this.scene.add.existing(this); //lo añades en la escena
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        this.speedX = 300;
        this.speedY = 300;
        this.cursorsPlayer = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.D,
            right: Phaser.Input.Keyboard.KeyCodes.A
        });
    }

    preload() {
        this.load.spritesheet('player', 'assets/sprites/player.png',
            { frameWidth: 512, frameHeight: 234 });
    }

    update() {
        if(this.cursorsPlayer.up.isDown) this.body.setVelocityY(speed);
        else if(this.cursorsPlayer.down.isDown) this.body.setVelocityY(-speed);
        else if(this.cursorsPlayer.left.isDown) this.body.setVelocity(-speed);
        else this.body.setVelocity(speed);
    }
}