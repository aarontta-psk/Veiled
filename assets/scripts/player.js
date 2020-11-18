export default class Player extends Phaser.Scene{
    constructor(){
        super({key:'player'});
    }

    preload(){
        this.load.spritesheet('player',
        'assets/sprites/player.png',
        { frameWidth: 512, frameHeight: 234 } );
    }
}