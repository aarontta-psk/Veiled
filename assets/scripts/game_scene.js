import Npc from './npc.js';
import { footSteps } from './stimulus.js';

//clase escena de juego de la que hereda el nivel jugable
export default class GameScene extends Phaser.Scene {
    constructor(key) {
        super({ key: key }) //constructora de escena
    };

    preload() {
        // Carga el plugin para las tiles animadas
        this.load.scenePlugin('AnimatedTiles', './assets/plugins/animated_tiles.js', 'animatedTiles', 'animatedTiles');
    }

    create() {
        this.scene.bringToTop(); //se pone la escena la primera en el orden para ver las escenas
        this.matter.world.disableGravity(); //desactivamos gravedad
    }

    update(time, delta) {
        //actualizacion zona de vision
        const [playerX, playerY] = [this.player.x, this.player.y];
        const [visionX, visionY] = [this.vision.x, this.vision.y];

        if ((playerX === this.spawnpoint.x && playerY === this.spawnpoint.y) || (visionX !== playerX || visionY !== playerY)) {
            this.blindfold.setVision(this.vision, playerX, playerY);
        }

        //para cada npc, se muestra su tooltip si tiene algun evento disponible
        for (const npc of this.npcs) {
            if (npc.tooltip.visible) {
                if (npc.nextEvent() !== null) npc.updateTooltip(); //se actualiza la posicion del tooltip
                else npc.tooltip.setVisible(false);
            }
        }

        //si no es el nivel tutorial, hago lo mismo con los triggerEvents
        if (this.scene.key !== 'level0') {
            for (const trigger of this.triggerEvents) {
                if (trigger.tooltip.visible && trigger.nextEvent() === null)
                    trigger.tooltip.setVisible(false);
            }
        }

        //actualizacion barra de cordura
        this.gui.updateSanityBar(this.player.sanity);
    }

    //metodo que genera un npc accediendo a todas sus posiciones, cargandolas del json
    generateNPC(key, isStatic, range, events) {
        let path = Array(); //array que contendra los caminos
        //para cada punto del camino de un npc, se guarda su x, y y tiempo de espera hasta volver a caminar
        for (const pathPoint of this.map.getObjectLayer('npcs').objects) {
            if (pathPoint.name == key)
                path[pathPoint.properties[0].value] = {
                    'x': pathPoint.x,
                    'y': pathPoint.y,
                    'pause': pathPoint.properties[1].value
                }
        }

        //creamos el npc
        let npc = new Npc(key, this.matter.world, path[0].x, path[0].y, events, path, range);
        
        //asignación de el estimulo de pasos al npc
        let steps = new footSteps(this.soundParticle);
        steps.emitter.startFollow(npc);
        //si es estatico no tiene pasos
        if (!isStatic)
            npc.footSteps = steps;
        else
            npc.footsteps = null;
        //se hace estatico si el npc va a estar quieto
        npc.setStatic(isStatic);
        return npc;
    }

    //metodo que carga del json los objetivos donde estan las eventos principales 
    loadObjectives() {
        this.objectives = new Array();
        for (const objective of this.map.getObjectLayer('objectives').objects) {
            this.objectives[objective.properties[1].value] = {
                //posicion
                'x': objective.x,
                'y': objective.y,
                'faithReq': objective.properties[0].value //requesito de fe para mostrar este objetivo
            };
        }
        //el objetivo inicial es el 0
        this.currentObjective = 0;
    }

    //metodo que actualiza el objetivo
    nextObjective() {
        this.currentObjective++;
        if (this.currentObjective >= this.objectives.length)
            this.currentObjective = -1; //si currentObjective === -1, es que se han completado todos los objetivos
    }

    //metodo que al pasar a una nueva seccion restablece los bounds de la camara
    newSection(trigger) {
        const bounds = this.cameras.main.getBounds();
        if (this.hasChangedSection([this.player.x, this.player.y], bounds)) {
            //se eliminan los bounds de la camara
            this.cameras.main.removeBounds();
            //establezco los nuevos bounds
            const [height, y, width, x] = trigger.newBounds;
            this.cameras.main.setBounds(x, y, width, height);
            trigger.newBounds = [bounds.height, bounds.y, bounds.width, bounds.x];
        }
    }

    //metodo que comprueba si el jugador se encuentra fuera de los bounds de la camara
    hasChangedSection([x, y], bounds) {
        return !(x > bounds.x && x < (bounds.x + bounds.width) && y > bounds.y && y < (bounds.y + bounds.height))
    }

    //metodo para que el personaje no se quede pillado al moverse o al hacer otra accion
    resetInputs() {
        for (const property in this.player.cursorsPlayer) {
            this.player.cursorsPlayer[property].reset(); //reinicio cada tecla
        }
    }

    //metodo para cambiar de escena pasando informacion y sin detener la escena actual
    changeScene(newScene) {
        //guardo la info entre escenas y cambio de escena
        this.infoNextScene = { player: this.player, prevScene: this, blindfold: this.blindfold };
        //paro la musica
        this.sound.stopAll();
        this.scene.sleep(); //se duerme la escena
        this.scene.run(newScene, this.infoNextScene);
        //evito que se queden pillado el input al cambiar de escena
        this.resetInputs();
    }

    //metodo que recoloca los nuevos bounds por defecto
    readjustTriggers() {
        for (const trigger of this.triggersToSect)
            trigger.newBounds = trigger.info;
    }

    //metodo que reajusta la venda cuando muere el jugador
    deathBlindfold(blindfold, silhouette) {
        blindfold.setBlindfoldOn(true); //se pone la venda
        blindfold.setVision(this.vision, this.player.x, this.player.y); //se ajusta la posicion de la zona de vision
        silhouette.toggle(this.blindfold.blind); //se oculta la silueta
    }

    //metodo que inserta un item en el inventario del jugador
    insertItem(itemToInsert) {
        //si se esta colisionando con un item
        if (itemToInsert !== undefined) {
            this.sound.play('sfxPickItem');
            this.player.inventory.addObject(itemToInsert); //se añade al inventario
            this.gui.addItem(itemToInsert); //se añade a la gui
            itemToInsert = undefined; //se borra la referencia al item
        }
    }

    //metodo que alterna la visibilidad de la venda
    onBlindChange() {
        this.blindfold.setBlindfold();
        //la silueta no existe en el preludio
        if (this.scene.key !== 'level0') this.silhouette.toggle(this.blindfold.blind);
        //para cada npc que se este moviendo
        for (const npc of this.npcs) {
            npc.setVisible(!this.blindfold.blind); //cambio su visibilidad
            //si se mueve, se muestra el efecto del estimulo de los pasos
            if (this.blindfold.blind && npc.state === 'moving')
                npc.footSteps.emitter.start();
        }
        //para cada trigger
        for (const trigger of this.triggerEvents) {
            //si la venda esta puesta
            if (this.blindfold.blind) {
                if (trigger.stimulus !== null) trigger.stimulus.emitter.start(); //reproduce su estimulo
            }
            else {
                if (trigger.stimulus !== null) trigger.stimulus.emitter.stop(); //para su estimulo
            }
        }

        //efecto de sonido
        if (this.blindfold.blind) this.sound.play('sfxActivateBlind');
        else this.sound.play('sfxDesactivateBlind');
    }
}
