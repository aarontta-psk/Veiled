import Blindfold from './blindfold.js';
import Player from './player.js';
import { potionItem, kaleidoscopeItem, sketchItem } from './item.js';
import Npc from './npc.js';
import Trigger from './trigger.js';
import GUI from './gui.js';
import { soundStimulus, smellStimulus } from './stimulus.js';
import Silhouette from './silhouette.js'

export default class NewGameScene extends Phaser.Scene {
    constructor(key) {
        super({ key: key })
    };

    preload() {
        // Carga el plugin para las tiles animadas
        this.load.scenePlugin('AnimatedTiles', './assets/plugins/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }

    create() {
        this.scene.bringToTop();
        // Desactivamos gravedad
        this.matter.world.disableGravity();
        
        // Creamos un mapa a partir de los datos en cache
        this.map = this.make.tilemap({
            key: 'map',
            tileWidth: 64,
            tileHeight: 64
        });
    }

    
    //transicion a nueva seccion
    newSection(trigger) {
        const bounds = this.cameras.main.getBounds();
        if (this.hasChangedSection([this.player.x, this.player.y], bounds)) {
            this.cameras.main.removeBounds();
            const [height, y, width, x] = trigger.newBounds;
            this.cameras.main.setBounds(x, y, width, height);
            trigger.newBounds = [bounds.height, bounds.y, bounds.width, bounds.x];
        }
    }

    //bool interseccion
    hasChangedSection([x, y], bounds) {
        return !(x > bounds.x && x < (bounds.x + bounds.width) && y > bounds.y && y < (bounds.y + bounds.height))
    }

    //metodo para que el personaje no se quede pillado al moverse o al hacer otra accion
    resetInputs() {
        for (const property in this.player.cursorsPlayer) {
            this.player.cursorsPlayer[property].reset();
        }
    }

    //metodo para cambiar de escena pasando informacion y sin detener la escena actual
    changeScene(newScene) {
        //guardo la info entre escenas y cambio de escena
        this.infoNextScene = { player: this.player, prevScene: this };
        //paro la musica
        this.sound.stopAll();
        this.scene.sleep();
        this.scene.run(newScene, this.infoNextScene);
        //evito que se queden pillado el input al cambiar de escena
        this.resetInputs();
    }

    readjustTriggers() {
        for (const trigger of this.triggersToSect)
            trigger.newBounds = trigger.info;
    }

    deathBlindfold() {
        this.blindfold.setBlindfold();
        this.blindfold.setVision(this.vision, this.player.x, this.player.y);
    }

    insertItem(itemToInsert) {
        if (itemToInsert !== undefined) {
            this.player.inventory.addObject(itemToInsert);
            this.gui.addItem(itemToInsert);
            console.log(itemToInsert.x, itemToInsert.y, "item");
            itemToInsert = undefined;
            console.log(itemToInsert);
            console.log(this.player.inventory)
        }
    }

    //metodo generalizado de creacion de animaciones de movimiento por defecto
    createAnims(key, speed) {
        this.anims.create({
            key: 'idle_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 1, end: 1 }),
            frameRate: speed,
            repeat: -1
        }); this.anims.create({
            key: 'idle_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 1, end: 1 }),
            frameRate: speed,
            repeat: -1
        });
        this.anims.create({
            key: 'up_move_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 9, end: 17 }),
            frameRate: speed,
            repeat: -1
        });
        this.anims.create({
            key: 'down_move_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 0, end: 8 }),
            frameRate: speed,
            repeat: -1
        });
        this.anims.create({
            key: 'left_move_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 27, end: 35 }),
            frameRate: speed,
            repeat: -1
        });
        this.anims.create({
            key: 'right_move_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 18, end: 26 }),
            frameRate: speed,
            repeat: -1
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
