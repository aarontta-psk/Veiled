import SampleEvent from './sampleEvent';
import Player from './player';

new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Player, SampleEvent],
})