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

    generateNPC(key, world, events)
    {
        let path = Array();
        for (const pathPoint of this.map.getObjectLayer('npcs').objects)
            if (pathPoint.name == key)
                path[pathPoint.properties[0].value] = {
                    'x': pathPoint.x, 
                    'y': pathPoint.y, 
                    'pause': pathPoint.properties[1].value}

        return new Npc(key, world, path[0].x, path[0].y, events, path);
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

    onBlindChange(){

        this.blindfold.setBlindfold();
        this.silhouette.toggle(this.blindfold.blind);
        for (let i = 0; i<this.npcs.length; i++)
        {
            this.npcs[i].setVisible(!this.blindfold.blind);
        }
        for (let i = 0; i<this.stimuli.length; i++)
        {
            if (this.blindfold.blind)
                this.stimuli[i].emitter.start();
            else
                this.stimuli[i].emitter.stop();
        }
    }   
}
