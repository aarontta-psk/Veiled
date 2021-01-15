import Boot from "./boot.js"
import Level1 from "./level1.js";
import Level2 from "./level2.js";
import {testEvent, anotherTestEvent, deathEvent_0, maxFaithEvent_0 , painterEvent_0, painterEvent_1, painterEvent_2, doctorEvent_0, doctorEvent_1,
    lumberjackEvent_0, lumberjackEvent_1, sickTreeEvent
/*BORRAR ESTAS*/ , testSilueta_0, testSilueta_1, testSilueta_2} from "./event_scene.js";
import PauseScene from "./pause_scene.js";
import MainMenu from "./mainMenu.js";
import Options from './options.js';
import InfoLevel from './infoLevel.js';
import levelSelector from "./level_selector_menu.js";

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
    scene: [Boot, MainMenu, Options, levelSelector, Level1, Level2, InfoLevel, testEvent, anotherTestEvent, deathEvent_0, maxFaithEvent_0, PauseScene, painterEvent_0, painterEvent_1, painterEvent_2, doctorEvent_0,
        doctorEvent_1, lumberjackEvent_0, lumberjackEvent_1, sickTreeEvent, testSilueta_0, testSilueta_1, testSilueta_2], //escenas a cargar
})