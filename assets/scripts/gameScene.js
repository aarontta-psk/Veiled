import Blindfold from './blindfold.js';
import Player from './player.js';
import { potionItem, kaleidoscopeItem, keyItem1, sketchItem } from './item.js';
import Npc from './npc.js';
import Trigger from './trigger.js';
import GUI from './gui.js';
import Stimulus from './stimulus.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' })
    };

    preload() {
        // Carga el plugin para las tiles animadas
        this.load.scenePlugin('AnimatedTiles', './assets/plugins/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }

    create() {
        this.matter.world.disableGravity();

        // Creamos un mapa a partir de los datos en cache
        this.map = this.make.tilemap({
            key: 'map',
            tileWidth: 64,
            tileHeight: 64
        });

        // Asignamos el tileset
        const tileset = this.map.addTilesetImage('slates', 'tiles');

        // Creamos layers por debajo del jugador (probablemente deberiamos establecer una profundidad para que todo quede más limpio)
        this.map_zones = this.map.createStaticLayer('map_zones', tileset);
        this.map_limits = this.map.createStaticLayer('map_limits', tileset);
        this.ground_01 = this.map.createStaticLayer('ground_01', tileset);
        this.ground_02 = this.map.createStaticLayer('ground_02', tileset);
        this.ground_03 = this.map.createStaticLayer('ground_03', tileset);
        this.building_01 = this.map.createStaticLayer('building_01', tileset);
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
                trigger.newBounds = trigger.info;
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
            /*this.testNpc = new Npc('doctor', this.matter.world, this.spawnpoint.x + 20,
                this.spawnpoint.y + 200, [this.scene.get('testEvent'), this.scene.get('anotherTestEvent')],
                {
                    //path
                    'x': [this.spawnpoint.x + 20],
                    'y': [this.spawnpoint.y + 200],
                    'pause': [1000]
                }),*/
            this.painterNpc = new Npc('painter', this.matter.world, 3872,
                3552, [this.scene.get('painterEvent_0'), this.scene.get('painterEvent_1')],
                {
                    //path
                    'x': [3872, 3744, 3872, 3680],
                    'y': [3552, 3552, 3552, 3680],
                    'pause': [1000, 1000, 1000, 1000]
                }),
            this.doctorNpc = new Npc('doctor', this.matter.world, 4256,
                2208, [this.scene.get('doctorEvent_0')],
                {
                    //path
                    'x': [4256, 4256, 4000],
                    'y': [2208, 2336, 2336],
                    'pause': [8000, 10, 1000]
                })

        ];

        // Colocamos la vision en la posicion del jugador
        const [x, y] = [this.player.x, this.player.y];
        this.vision = this.add.image(x, y, 'vision').setVisible(false).setScale(0.4);

        // Creamos más layers por encima del jugador (probablemente deberiamos establecer una profundidad para que todo quede más limpio)
        this.building_03 = this.map.createStaticLayer('building_03', tileset);
        this.roof_01 = this.map.createStaticLayer('roof_01', tileset);
        this.animated = this.map.createDynamicLayer('animated', tileset);
        this.forest_01 = this.map.createStaticLayer('forest_01', tileset);
        this.forest_02 = this.map.createStaticLayer('forest_02', tileset);


        // Creacion de items a partir del atlas
        this.item = undefined; //undefined para la comprobacion del evento de interaccion
        this.items = this.textures.get('items');
        this.itemFrames = this.items.getFrameNames();
        this.itemContainer = [];


        // Creacion de objetos segun el Tilemap
        for (const itemPos of this.map.getObjectLayer('collectable').objects) {
            if (itemPos.name === 'potion') {
                this.potion = new potionItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[0], this.player);
                this.itemContainer.push(this.potion);
            }
            //meto el caleidoscopio aqui para probar el item, aunque no vaya a tener este sprite
            else if (itemPos.name === 'coin') {
                this.coin = new kaleidoscopeItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[2], this.player);
                this.itemContainer.push(this.coin);
            }
            else if (itemPos.name === 'sketch') {
                this.sketch = new sketchItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[1], this.player);
                this.itemContainer.push(this.sketch);
            }
        }

        this.blindfold = new Blindfold(this, 940, 970, this.vision);

        const height = this.spawnpoint.properties[0].value, heightBg = this.spawnpoint.properties[1].value,
            width = this.spawnpoint.properties[2].value, widthBg = this.spawnpoint.properties[3].value;
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(widthBg, heightBg, width, height);

        //creacion de animaciones
        this.createAnims('player');
        this.createAnims('painter');
        this.createAnims('doctor');

        this.player.cursorsPlayer.blindfold.on('down', event => {
            this.blindfold.setBlindfold();
        });

        this.player.cursorsPlayer.interact.on('down', event => {
            this.insertItem(this.item);
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

        // Añadimos colision a las layers del tilemap que lo necesitan
        this.building_01.setCollisionByProperty({ obstacle: true });
        this.matter.world.convertTilemapLayer(this.building_01);

        this.map_limits.setCollisionByProperty({ obstacle: true });
        this.matter.world.convertTilemapLayer(this.map_limits);

        this.building_03.setCollisionByProperty({ obstacle: true });
        this.matter.world.convertTilemapLayer(this.building_03);

        this.forest_02.setCollisionByProperty({ obstacle: true });
        this.matter.world.convertTilemapLayer(this.forest_02);

        this.matter.world.on('collisionstart',
            (evento, cuerpo1, cuerpo2) => {
                if (cuerpo1.gameObject === this.player) {
                    if (cuerpo2.gameObject === this.potion)
                        this.item = this.potion;
                    else if (cuerpo2.gameObject === this.housekey)
                        this.item = this.housekey;
                    else if (cuerpo2.gameObject === this.coin)
                        this.item = this.coin;
                }
            });

        this.matter.world.on('collisionend',
            (evento, cuerpo1, cuerpo2) => {
                if (cuerpo1.gameObject === this.player) {
                    //desasignamos el item en el que estuviese (aunque no estuviese en ninguno)
                    if (cuerpo2.gameObject === this.coin || cuerpo2.gameObject === this.housekey
                        || cuerpo2.gameObject === this.potion) this.item = undefined;

                    //buscamos si sale de un trigger de seccion
                    let i = 0;
                    while (i < this.triggersToSect.length && cuerpo2.gameObject !== this.triggersToSect[i])
                        i++;
                    if (i !== this.triggersToSect.length) this.newSection(this.triggersToSect[i]);
                }
            });

        this.matter.world.on('collisionactive', (evento, cuerpo1, cuerpo2) => {
            if (cuerpo1.gameObject === this.player &&
                cuerpo2.gameObject instanceof Npc) {
                //mensaje informativo
                console.log("overlapping a npc");
                //si se esta pulsando la tecla de interactuar, se llama al evento del npc
                if (this.player.cursorsPlayer.interact.isDown) {
                    let npcEvent = cuerpo2.gameObject.nextEvent();
                    if (npcEvent != null)
                        this.changeScene(npcEvent);
                }
            }
        })

        // Inicia la animacíon de las tiles
        this.animatedTiles.init(this.map);

        let particles = this.add.particles('player');

        new Stimulus(particles, {x: this.player.x, y: this.player.y});
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
            const [height, y, width, x] = trigger.newBounds;
            this.cameras.main.setBounds(x, y, width, height);
            trigger.newBounds = [bounds.height, bounds.y, bounds.width, bounds.x];
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
    createAnims(key) {
        this.anims.create({
            key: 'idle_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'up_move_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 9, end: 17 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'down_move_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 0, end: 8 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'left_move_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 27, end: 35 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'right_move_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 18, end: 26 }),
            frameRate: 4,
            repeat: -1
        });
    }
}