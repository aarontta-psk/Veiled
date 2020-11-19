import Player from './player.js';

export default class GameScene extends Phaser.Scene {
    constructor(){ super( { key: 'gameScene'} ) };

    create() {
        this.player = new Player(this, 100, 100);
    }
}