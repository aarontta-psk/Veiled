import Player from './player.js';

export default class GameScene extends Phaser.Scene {
    constructor() { super({ key: 'gameScene' }) };

    preload() {
        this.load.spritesheet('player', './assets/sprites/player.png',
            { frameWidth: 512, frameHeight: 234 });
    }

    create() {
        let player = new Player(this, 400, 500, 'player');
        this.anims.create({
            key: 'down_move',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'up_move',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'left_move',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'right_move',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 2,
            repeat: -1
        });
    }
}