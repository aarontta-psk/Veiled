import Player from './player.js';

export default class GameScene extends Phaser.Scene {
    constructor(){ super( { key: 'gameScene'} ) };

    preload() {
        this.load.spritesheet('player', './assets/sprites/player.png',
            { frameWidth: 512, frameHeight: 234 });
    }

    create() {
        let player = new Player(this, 400, 500,'player');
    }
}