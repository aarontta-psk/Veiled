import Boot from "./boot.js"
import GameScene from "./gameScene.js";
import {testEvent, anotherTestEvent} from "./eventScene.js";
import PauseScene from "./pauseScene.js";

new Phaser.Game({
    type: Phaser.AUTO,
    width: 800, //ancho camara
    height: 600, //alto camara
    scale: { //escala en la ventana
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    },
    physics: { //fisicas de matter
        default: 'matter',
        matter: {
            gravity: {
                y: 0
            },
            debug: { //debug activado
                showBody: true,
                showStaticBody: true
            }
        }
    },
    scene: [Boot, GameScene, testEvent, anotherTestEvent, PauseScene], //escenas a cargar
})