import Blindfold from './blindfold.js';
import Player from './player.js';
import Item, { PotionItem, KaleidoscopeItem, SketchItem, SickTreeItem, StampItem, BlessingItem, PositiveWordItem, OffensiveWordItem, SacredFireItem, AvoidDeathItem, LessDeathItem } from './item.js';
import Npc from './npc.js';
import Trigger from './trigger.js';
import GUI from './gui.js';
import { soundStimulus, smell } from './stimulus.js';
import Silhouette from './silhouette.js'
import NewGameScene from './gameScene.js'
import EventHandler from './eventHandler.js';

const LEVEL_FAITH_REQUERIMENT = 40;

export default class Level1 extends NewGameScene {
    constructor() {
        super('level1');
    };

    preload() {
        super.preload();
    }

    create() {
        super.create();

        //sonidos
        this.sound.play('mainTheme', {
            mute: false, volume: 0.5, rate: 1, detune: 0, seek: 0, loop: true, delay: 0
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
                let savedFaith;
                if (this.info !== undefined && this.info.obtainedFaith !== undefined) savedFaith = this.info.obtainedFaith;
                else savedFaith = 0;
                this.player = new Player(this.matter.world, objeto.x, objeto.y, objeto, savedFaith);
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

        //PRUEBAS DE ESTIMULOS
        this.smellParticle = this.add.particles('smellCloud');
        this.soundParticle = this.add.particles('soundCircle');

        //no es necesario pasar estos atributos como parametros, pero ayuda a la claridad
        this.generateStimulus(this.smellParticle, this.soundParticle);

        // Añado un npc de prueba en un array
        this.npcs = [
            this.doctorNpc = this.generateNPC(
                'doctor',
                [this.scene.get('doctorEvent_0'), this.scene.get('doctorEvent_1')]
            ),
            this.painterNpc = this.generateNPC(
                'painter',
                [this.scene.get('painterEvent_0'), this.scene.get('painterEvent_1'), this.scene.get('painterEvent_2')]
            ),
            this.lumberjackNpc = this.generateNPC(
                'lumberjack',
                [this.scene.get('lumberjackEvent_0'), this.scene.get('lumberjackEvent_1')]
            )
        ];

        this.silhouette = new Silhouette(this.matter.world, 750, 550,
            [this.scene.get('testSilueta_0'), this.scene.get('testSilueta_1'), this.scene.get('testSilueta_2'), this.scene.get('maxFaithEvent_0')]);

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
                this.potion = new PotionItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[8], this.player);
                this.itemContainer.push(this.potion);
                //TESTEO DE ITEMS, NO BORRAR
                // this.TESTING = new LessDeathItem(this.matter.world, this.player.x + 250, this.player.y, this.itemFrames[0], this.player);
                // this.itemContainer.push(this.TESTING);
            }
            //meto el caleidoscopio aqui para probar el item, aunque no vaya a tener este sprite
            else if (itemPos.name === 'coin') {
                this.coin = new KaleidoscopeItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[4], this.player);
                this.itemContainer.push(this.coin);
            }
            else if (itemPos.name === 'sketch') {
                this.sketch = new SketchItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[10], this.player);
                this.itemContainer.push(this.sketch);
            }
        }
        let sickTree = new SickTreeItem(this.matter.world, 0, 0, this.itemFrames[10], this.player)
        this.itemContainer.push(sickTree);

        this.blindfold = new Blindfold(this, 940, 970, this.vision);

        const height = this.spawnpoint.properties[0].value, heightBg = this.spawnpoint.properties[1].value,
            width = this.spawnpoint.properties[2].value, widthBg = this.spawnpoint.properties[3].value;
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(widthBg, heightBg, width, height);


        this.player.cursorsPlayer.blindfold.on('down', event => {
            this.onBlindChange();
        });
        this.player.cursorsPlayer.interact.on('down', event => {
            if (this.item != undefined)
                this.insertItem(this.item);
            else if (this.blindfold.blind && this.player.sanity > LEVEL_FAITH_REQUERIMENT) {
                let silEvent = this.silhouette.nextEvent();
                if (silEvent != null)
                    this.changeScene(silEvent);
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
            this.player.resetInputs();
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
                    if (cuerpo2.gameObject instanceof Item) {
                        this.item = cuerpo2.gameObject;
                    }
                }
            });

        this.matter.world.on('collisionend',
            (evento, cuerpo1, cuerpo2) => {
                if (cuerpo1.gameObject === this.player) {
                    //desasignamos el item en el que estuviese (aunque no estuviese en ninguno)
                    this.item = undefined;

                    // //buscamos si sale de un trigger de seccion
                    if (cuerpo2.gameObject instanceof Trigger) this.newSection(cuerpo2.gameObject);
                }
            });

        this.matter.world.on('collisionactive', (evento, cuerpo1, cuerpo2) => {
            if (cuerpo1.gameObject === this.player &&
                cuerpo2.gameObject instanceof EventHandler) {
                //booleano de control
                //si se esta pulsando la tecla de interactuar, se llama al evento del npc
                if (this.player.cursorsPlayer.interact.isDown) {
                    let npcEvent = cuerpo2.gameObject.nextEvent();
                    if (npcEvent != null)
                        this.changeScene(npcEvent);
                }
            }
        })

        this.scene.scene.cameras.main.on('camerafadeoutcomplete', event => {
            if (this.player.death === this.player.deathState.CheckDeath) {
                this.changeScene('deathEvent_0');
                this.cameras.main.fadeIn(2000);
                this.player.enableInputs(true);
            }
            console.log("outComplete")
        });

        this.scene.scene.cameras.main.on('camerafadeincomplete', event => {
            console.log("inComplete")
        });

        this.events.on('wake', event => {
            //la musica vuelve a sonar
            this.sound.play('mainTheme', {
                mute: false, volume: 0.5, rate: 1, detune: 0, seek: 0, loop: true, delay: 0
            });

            if (this.player !== undefined && this.player.death === this.player.deathState.Dead) {
                this.player.die();
            }
            else {
                if (this.player.death === this.player.deathState.CheckDeath) {
                    this.player.addSanity(this.player.maxSanity / 2);
                    this.deathBlindfold();
                    this.player.setAlive();
                }
                else {
                    if (!this.blindfold.blind) this.onBlindChange();
                }
            }
        });

        // Inicia la animacíon de las tiles
        this.animatedTiles.init(this.map);
    }

    update(time, delta) {
        super.update();
    }
}