import Blindfold from './blindfold.js';
import EventManager from './eventManager.js';
import Player from './player.js';

export default class GameScene extends Phaser.Scene {
    constructor() { super({ key: 'gameScene' }) };

    preload() {
        this.load.spritesheet('player', './assets/sprites/player.png',
            { frameWidth: 47, frameHeight: 60 });
        this.load.image('background', './assets/sprites/background.jpg');
        this.load.image('vision', './assets/sprites/vision.jpg');
        this.load.image('blindfold', './assets/sprites/black_background.png');
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0).setScale(0.5, 0.7);
        this.vision = this.add.image(400, 300, 'vision').setOrigin(0);

        this.player = new Player(this, 400, 500);
        this.blindfold = new Blindfold(this, 0, 0, this.vision);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'up_move',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'down_move',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'left_move',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'right_move',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            frameRate: 4,
            repeat: -1
        });

        this.player.blindfold().on('down', event => {
            console.log('estoy en el evento wow');
            this.blindfold.setBlindfold();
        });
    }

    update(time, delta) {
        if (this.player.isInteracting()) {
            this.scene.start('eventManager');
        }
    }
}