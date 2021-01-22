import Boot from "./boot.js"
import MainMenu from "./main_menu.js";
import Options from "./options.js";
import levelSelector from "./level_selector_menu.js";
import Level0 from "./level0.js";
import Level1 from "./level1.js";
import Level2 from "./level2.js";
import InfoLevel from "./infoLevel.js";
import PauseScene from "./pause_scene.js";
import {dad_Event_0, dad_Event_1, dad_Event_2} from "./events_level0.js"
import {
    //eventos idle
    brother_Event_Idle, doctor_Event_Idle, lumberjack_Event_Idle, sickTree_Event_Idle, vagabond_Event_Idle, inkKeeper_Event_Idle,
    grandmother_Event_Idle, cane_Event_Idle, tavern_Event_Idle,
    //eventos de la silueta
    testSilueta_0, testSilueta_1, testSilueta_2, testSilueta_3, testSilueta_4, testSilueta_5, testSilueta_6, 
    testSilueta_7, testSilueta_8, testSilueta_9,testSilueta_10, testSilueta_11,
    //eventos principales
    elder_Event_0, doctor_Event_0, doctor_Event_1, doctor_Event_2, doctor_Event_3, vagabond_Event_0, vagabond_Event_1, lumberjack_Event_0, lumberjack_Event_1, tavern_Event_0, cane_Event_0, sickTree_Event_0, grandmother_Event_0,
    //eventos secundarios
    glassesItem_Event_0, glasses_Event_0, glasses_Event_1, glasses_Event_2, foreigner_Event_0, foreigner_Event_1, seller_Event_0,
    seller_Event_1, hungryKid_Event_0, elder_Event_1, well_Event_0, coins_Event_0, grave_Event_0, brother_Event_0, painterEvent_0, 
    painterEvent_1, inkKeeper_Event_0,
    //eventos especiales
    deathEvent_0
} from "./events_level1.js"

const config = {
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
    //escenas a cargar
    scene: [Boot, MainMenu, Options, levelSelector, Level0, Level1, Level2, InfoLevel, PauseScene,
        //eventos nivel 0
        dad_Event_0, dad_Event_1, dad_Event_2,
        //eventos idle
        brother_Event_Idle, doctor_Event_Idle, lumberjack_Event_Idle, sickTree_Event_Idle, vagabond_Event_Idle, inkKeeper_Event_Idle,
        grandmother_Event_Idle, cane_Event_Idle, tavern_Event_Idle,
        //eventos de la silueta
        testSilueta_0, testSilueta_1, testSilueta_2, testSilueta_3, testSilueta_4, testSilueta_5, testSilueta_6, 
        testSilueta_7, testSilueta_8, testSilueta_9,testSilueta_10, testSilueta_11,
        //eventos principales
        elder_Event_0, doctor_Event_0, doctor_Event_1, doctor_Event_2, doctor_Event_3, vagabond_Event_0, vagabond_Event_1, lumberjack_Event_0, lumberjack_Event_1, tavern_Event_0, cane_Event_0, sickTree_Event_0, grandmother_Event_0,
        //eventos secundarios
        glassesItem_Event_0, glasses_Event_0, glasses_Event_1, glasses_Event_2, foreigner_Event_0, foreigner_Event_1, seller_Event_0,
        seller_Event_1, hungryKid_Event_0, elder_Event_1, well_Event_0, coins_Event_0, grave_Event_0, brother_Event_0, painterEvent_0, 
        painterEvent_1, inkKeeper_Event_0,
        //eventos especiales
        deathEvent_0
    ]
}


//creacion del juego
new Phaser.Game(config);

export default class Main{
    //metodo que destruye el juego y lo recarga
    //(Destruir el juego no es la forma mas correcta de reiniciar el nivel, somos conscientes de ello)
    restartGame(ref){
        ref.sys.game.destroy(true);
        new Phaser.Game(config);
    }
}
