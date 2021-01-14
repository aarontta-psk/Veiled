import Npc from './npc.js';
import {treeSmell, footSteps} from './stimulus.js';
import Trigger,{EventTrigger} from './trigger.js';
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

    update(time, delta) {
        //actualizacion zona de vision
        const [playerX, playerY] = [this.player.x, this.player.y];
        const [visionX, visionY] = [this.vision.x, this.vision.y];

        if ((playerX === this.spawnpoint.x && playerY === this.spawnpoint.y) || (visionX !== playerX || visionY !== playerY)) {
            this.blindfold.setVision(this.vision, playerX, playerY);
        }

        //actualizacion barra de cordura
        this.gui.updateSanityBar(this.player.sanity);
    }   

    generateNPC(key, events)
    {
        let path = Array();
        for (const pathPoint of this.map.getObjectLayer('npcs').objects)
            if (pathPoint.name == key)
                path[pathPoint.properties[0].value] = {
                    'x': pathPoint.x, 
                    'y': pathPoint.y, 
                    'pause': pathPoint.properties[1].value}
        
        let npc = new Npc(key, this.matter.world, path[0].x, path[0].y, events, path);

        //asignación de pasos al npc
        let steps = new footSteps(this.soundParticle);
        steps.emitter.startFollow(npc);
        npc.footSteps = steps;

        return npc;
    }

    generateStimulus(smells, sounds)
    {
        // this.stimuli = new Array();
        // for (const stimulus of this.map.getObjectLayer('stimuli').objects)
        // {
        //     let stim;
        //     let position = {'x':stimulus.x, 'y':stimulus.y};
        //     switch (stimulus.name)
        //     {
        //         case 'treeSmell':
        //             stim = new treeSmell(smells, position);
        //     }
        //     this.stimuli.push(stim);
        // }
        this.triggerEvents = new Array();
        for (const stimulus of this.map.getObjectLayer('stimuli').objects)
        {
            let stim;
            let trigger;
            let position = {'x':stimulus.x, 'y':stimulus.y};
            switch (stimulus.name)
            {
                case 'treeSmell':
                    stim = new treeSmell(smells, position);
                    trigger = new EventTrigger(this.matter.world, position.x, position.y, 100, 100, stim, [this.scene.get('sickTreeEvent')])
            }
            this.triggerEvents.push(trigger);
        }
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
            this.sound.play('sfxPickItem');
            this.player.inventory.addObject(itemToInsert);
            this.gui.addItem(itemToInsert);
            console.log(itemToInsert.x, itemToInsert.y, "item");
            itemToInsert = undefined;
            console.log(itemToInsert);
            console.log(this.player.inventory)
        }
    }

    onBlindChange(){

        this.blindfold.setBlindfold();
        this.silhouette.toggle(this.blindfold.blind);
        for (let i = 0; i<this.npcs.length; i++)
        {
            this.npcs[i].setVisible(!this.blindfold.blind);
            if (this.blindfold.blind && this.npcs[i].state === 'moving')
                this.npcs[i].footSteps.emitter.start();
        }
        for (let i = 0; i<this.triggerEvents.length; i++)
        {
            if (this.blindfold.blind){
                this.triggerEvents[i].stimulus.emitter.start();
                this.sound.play('sfxActivateBlind');
            }
            else{
                this.triggerEvents[i].stimulus.emitter.stop();
                this.sound.play('sfxDesactivateBlind');
            }
        }
    }   
}
