import Boot from "./boot.js"
import GameScene from "./gameScene.js";
import {testEvent, anotherTestEvent, deathEvent_0, maxFaithEvent_0 , painterEvent_0, painterEvent_1, painterEvent_2, doctorEvent_0, doctorEvent_1
/*BORRAR ESTAS*/ , testSilueta_0, testSilueta_1, testSilueta_2} from "./eventScene.js";
import PauseScene from "./pauseScene.js";
import MainMenu from "./mainMenu.js";
import Options from './options.js';
import InfoLevel from './infoLevel.js';

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
                showBody: false,
                showStaticBody: false
            }
        }
    },
    scene: [Boot, MainMenu, Options, GameScene, InfoLevel, testEvent, anotherTestEvent, deathEvent_0, maxFaithEvent_0, PauseScene, painterEvent_0, painterEvent_1, painterEvent_2, doctorEvent_0,
        doctorEvent_1, testSilueta_0, testSilueta_1, testSilueta_2], //escenas a cargar
})