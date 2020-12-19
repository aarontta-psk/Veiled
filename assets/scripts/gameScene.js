import Blindfold from './blindfold.js';
import Player from './player.js';
import Item,{potionItem, kaleidoscopeItem, keyItem1} from './item.js';
import Npc from './npc.js';
import Trigger from './trigger.js';
import GUI from './gui.js'

export default class GameScene extends Phaser.Scene {
    constructor() { super({ key: 'gameScene' }) };

    preload() {
        // Carga el plugin para las tiles animadas
        this.load.scenePlugin('AnimatedTiles', './assets/plugins/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }

    create() {
        this.matter.world.disableGravity();
        
        // Cargamos las webfonts que se van a usar
        WebFont.load({
            google: {
                families: [ 'Neucha' ]
            }
        });

        // Creamos un mapa a partir de los datos en cache
        this.map = this.make.tilemap({
            key: 'map',
            tileWidth: 64,
            tileHeight: 64
        });

        

        // Asignamos el tileset
        const tileset = this.map.addTilesetImage('slates', 'tiles');

        // Capas del mapa para asignar distintas funcionalidades
        this.map_zones = this.map.createStaticLayer('map_zones', tileset);
        this.map_limits = this.map.createStaticLayer('map_limits', tileset);
        this.ground_01 = this.map.createStaticLayer('ground_01', tileset);
        this.ground_02 = this.map.createStaticLayer('ground_02', tileset);
        this.ground_03 = this.map.createStaticLayer('ground_03', tileset);
        this.building_01 = this.map.createStaticLayer('building_01', tileset);
        // Esta capa es dinámica porque incluye tiles con animaciones        
        
        this.building_02 = this.map.createStaticLayer('building_02', tileset);        
        

        this.triggersToSect = [];
        // Spawnea al player en un punto definido en Tiled.
        // En Tiled tiene que haber una capa de objetos llamada 'capaObjetos'
        for (const objeto of this.map.getObjectLayer('objectLayer').objects) {
            // 'objeto.name' u 'objeto.type' nos llegan de las propiedades del
            // objeto en Tiled
            if (objeto.name === 'spawnPoint') {
                this.spawnpoint = objeto;
                this.player = new Player(this.matter.world, objeto.x, objeto.y, objeto);
            }
            else if (objeto.name === 'newSect') {
                let trigger = new Trigger(this.matter.world, objeto.x, objeto.y, objeto.width, objeto.height);
                trigger.info = [objeto.properties[0].value, objeto.properties[1].value,
                objeto.properties[2].value, objeto.properties[3].value];
                trigger.data = trigger.info;
                this.triggersToSect.push(trigger);
            }
        }

        this.gui = new GUI(this, 0, 0, this.player);

        for (const objeto of this.triggersToSect) {
            objeto.info2 = [this.spawnpoint.properties[0].value, this.spawnpoint.properties[1].value,
            this.spawnpoint.properties[2].value, this.spawnpoint.properties[3].value];
        }


        // Añado un npc de prueba en un array
        this.npcs = [
            //paso el sprite del player porque de momento no tenemos otro
            this.testNpc = new Npc('player', this.matter.world, this.spawnpoint.x + 20,
                this.spawnpoint.y + 200, [this.scene.get('testEvent'), this.scene.get('anotherTestEvent')],
                {
                    //path
                    'x': [1500, 1200, 1400],
                    'y': [1500, 1400, 1200],
                    'pause': [1000, 1000, 1000]
                }),
        ];

        // Colocamos la vision en la posicion del jugador
        const [x, y] = [this.player.x, this.player.y];
        this.vision = this.add.image(x, y, 'vision').setVisible(false).setScale(0.4);

        // Creamos un layer estático
        this.roof_01 = this.map.createStaticLayer('roof_01', tileset);
        this.animated = this.map.createDynamicLayer('animated', tileset);
        this.forest_01 = this.map.createStaticLayer('forest_01', tileset);
        this.forest_02 = this.map.createStaticLayer('forest_02', tileset);
       

        // Creacion de items a partir del atlas
        let item = undefined; //undefined para la comprobacion del evento de interaccion
        this.items = this.textures.get('items');
        this.itemFrames = this.items.getFrameNames();

        // Creacion de objetos segun el Tilemap
        for (const itemPos of this.map.getObjectLayer('collectable').objects) {
            if (itemPos.name === 'potion') {
                this.potion = new potionItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[0], this.player);
            }
            else if (itemPos.name === 'houseKey') {
                this.housekey = new keyItem1(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[1], this.player);
            }
            //meto el caleidoscopio aqui para probar el item, aunque no vaya a tener este sprite
            else if (itemPos.name === 'coin') {
                this.coin = new kaleidoscopeItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[2], this.player);
            }
        }

        this.blindfold = new Blindfold(this, 940, 970, this.vision);

        const height = this.spawnpoint.properties[0].value, heightBg = this.spawnpoint.properties[1].value,
            width = this.spawnpoint.properties[2].value, widthBg = this.spawnpoint.properties[3].value;
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(widthBg, heightBg, width, height);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'up_move',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'down_move',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'left_move',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'right_move',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            frameRate: 4,
            repeat: -1
        });

        this.player.cursorsPlayer.blindfold.on('down', event => {
            this.blindfold.setBlindfold();
        });

        this.player.cursorsPlayer.interact.on('down', event => {
            if (item !== undefined) {
                this.player.inventory.addObject(item);
                this.gui.addItem(item);
                console.log(item.x,item.y, "item");
                item = undefined;
                console.log(item);
                console.log(this.player.inventory)
            }
        });
        this.player.cursorsPlayer.invToggle.on('down', event => {
            this.gui.toggleInventory();
        });
        this.player.cursorsPlayer.testing.on('down', event => console.log(this.player.inventory.objects)) //testeo respawn

        this.player.cursorsPlayer.pause.on('down', event => {
            //guardo la info entre escenas y cambio de escena
            this.infoNextScene = { player: this.player, prevScene: this };

            this.scene.pause();
            this.scene.run('pauseScene', this.infoNextScene);
            //evito que se queden pillado el input al cambiar de escena
            this.resetInputs();
        });

        // Colision de las paredes 
        this.building_01.setCollisionByProperty({ obstacle: true });
        this.matter.world.convertTilemapLayer(this.building_01);

        this.map_limits.setCollisionByProperty({ obstacle: true });
        this.matter.world.convertTilemapLayer(this.map_limits);

        this.matter.world.on('collisionstart',
            (evento, cuerpo1, cuerpo2) => {
                if (cuerpo1.gameObject === this.player) {
                    if (cuerpo2.gameObject === this.potion)
                        item = this.potion;
                    else if (cuerpo2.gameObject === this.housekey)
                        item = this.housekey;
                    else if (cuerpo2.gameObject === this.coin)
                        item = this.coin;
                }
            });

        this.matter.world.on('collisionend',
            (evento, cuerpo1, cuerpo2) => {
                if (cuerpo1.gameObject === this.player) {
                    //desasignamos el item en el que estuviese (aunque no estuviese en ninguno)
                    if (cuerpo2.gameObject === this.coin || cuerpo2.gameObject === this.housekey
                        || cuerpo2.gameObject === this.potion) item = undefined;

                    //buscamos si sale de un trigger de seccion
                    let i = 0;
                    while (i < this.triggersToSect.length && cuerpo2.gameObject !== this.triggersToSect[i])
                        i++;
                    if (i !== this.triggersToSect.length) this.newSection(this.triggersToSect[i]);
                }
            });

        this.matter.world.on('collisionactive', (evento, cuerpo1, cuerpo2) => {    
            if (cuerpo1.gameObject === this.player &&
                cuerpo2.gameObject instanceof Npc){
                //mensaje informativo
                console.log("overlapping a npc");
                //si se esta pulsando la tecla de interactuar, se llama al evento del npc
                if(this.player.cursorsPlayer.interact.isDown){
                    let npcEvent = cuerpo2.gameObject.nextEvent();
                    if (npcEvent != null)
                        this.changeScene(npcEvent);
                }
            }
        })

        // Inicia la animacíon de las tiles
        this.animatedTiles.init(this.map);
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

    //transicion a nueva seccion
    newSection(trigger) {
        const bounds = this.cameras.main.getBounds();
        if (this.hasChangedSection([this.player.x, this.player.y], bounds)) {
            this.cameras.main.removeBounds();
            const [height, y, width, x] = trigger.data;
            this.cameras.main.setBounds(x, y, width, height);
            trigger.data = [bounds.height, bounds.y, bounds.width, bounds.x];
        }
    }

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

        this.scene.sleep();
        this.scene.run(newScene, this.infoNextScene);
        //evito que se queden pillado el input al cambiar de escena
        this.resetInputs();
    }

    readjustTriggers() {
        for (const trigger of this.triggersToSect)
            trigger.data = trigger.info;
    }

    deathBlindfold() {
        this.blindfold.setBlindfold();
        this.blindfold.setVision(this.vision, this.player.x, this.player.y);
    }   
}