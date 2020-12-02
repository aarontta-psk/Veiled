import EventManager from './eventManager.js';
import GameScene from "./gameScene.js";

new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0
            },
            debug: {
                showBody: true,
                showStaticBody: true
            }
        }
    },
    scene: [GameScene, EventManager],
})