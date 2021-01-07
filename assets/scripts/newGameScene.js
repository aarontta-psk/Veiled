import Blindfold from './blindfold.js';
import Player from './player.js';
import { potionItem, kaleidoscopeItem, sketchItem } from './item.js';
import Npc from './npc.js';
import Trigger from './trigger.js';
import GUI from './gui.js';
import { soundStimulus, smellStimulus } from './stimulus.js';
import Silhouette from './silhouette.js'

export default class GameScene extends Phaser.Scene {
    constructor(key) {
        super({ key: key })
    };

    preload() {
        // Carga el plugin para las tiles animadas
        this.load.scenePlugin('AnimatedTiles', './assets/plugins/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }

    create() {
        // Desactivamos gravedad
        this.matter.world.disableGravity();
        
        // Creamos un mapa a partir de los datos en cache
        this.map = this.make.tilemap({
            key: 'map',
            tileWidth: 64,
            tileHeight: 64
        });
    }

    onBlindChange(){

        this.blindfold.setBlindfold();
        this.silhouette.setVisible(this.blindfold.blind);

        this.npcs.array.forEach(element => {
            element.setVisible(!this.blindfold.blind);
            element.setActive(!this.blindfold.blind);
        });
        this.stimuli.array.forEach(element => {
            element.setVisible(this.blindfold.blind);
            element.setActive(this.blindfold.blind);
        });
    }    
}
