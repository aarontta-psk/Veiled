import NewGameScene from './game_scene.js'
import Blindfold from './blindfold.js';
import Player from './player.js';
import Item, {
    PotionItem, BlessingItem, SacredFireItem, AvoidDeathItem, BoozeItem, FoodItem
} from './item.js';
import GUI from './gui.js';
import Silhouette from './silhouette.js'
import EventHandler from './event_handler.js';
import ObjectiveMarker from './objective_marker.js';
import Trigger, { EventTrigger } from './trigger.js';
import { treeSmell } from './stimulus.js';

//escena de nivel 1, pueblo, donde se desarrolla la mayor parte del juego
export default class Level1 extends NewGameScene {
    constructor() {
        super('level1');
    };

    create() {
        super.create();

        // Creamos un mapa a partir de los datos en cache
        this.map = this.make.tilemap({
            key: 'map01',
            tileWidth: 64,
            tileHeight: 64
        });

        //activamos la musica de juego principal
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
                this.player = new Player(this.matter.world, objeto.x, objeto.y, objeto, savedFaith, 1);
            }
            else if (objeto.name === 'newSect') {
                let trigger = new Trigger(this.matter.world, objeto.x, objeto.y, objeto.width, objeto.height);
                trigger.info = [objeto.properties[0].value, objeto.properties[1].value,
                objeto.properties[2].value, objeto.properties[3].value];
                trigger.newBounds = trigger.info;
                this.triggersToSect.push(trigger);
            }
        }

        //Activamos la interfaz
        this.gui = new GUI(this, 0, 0, this.player);

        //creamos los triggers de sección, guardando los bounds correspondientes de cada uno
        for (const objeto of this.triggersToSect) {
            objeto.info2 = [this.spawnpoint.properties[0].value, this.spawnpoint.properties[1].value,
            this.spawnpoint.properties[2].value, this.spawnpoint.properties[3].value];
        }

        //creación de estímulos
        this.smellParticle = this.add.particles('smellCloud');
        this.soundParticle = this.add.particles('soundCircle');
        //creación de los eventos trigger, que pueden o no utilizar los estímulos 
        this.generateEventTriggers(this.smellParticle);

        //Añadimos los npcs en su array
        this.npcs = [
            this.generateNPC( //doctor
                'doctor', false, 60,
                [this.scene.get('doctor_Event_Idle'), this.scene.get('doctor_Event_0'), this.scene.get('doctor_Event_1'),
                this.scene.get('doctor_Event_2'), this.scene.get('doctor_Event_3')]
            ),
            this.generateNPC( //pintora
                'painter', false, 60,
                [this.scene.get('painterEvent_0'), this.scene.get('painterEvent_1')]
            ),
            this.generateNPC( //leñador
                'lumberjack', false, 60,
                [this.scene.get('lumberjack_Event_Idle'),this.scene.get('lumberjack_Event_0'), this.scene.get('lumberjack_Event_1')]
            ),
            this.generateNPC( //vagabundo
                'vagabond', true, 60,
                [this.scene.get('vagabond_Event_Idle'), this.scene.get('vagabond_Event_0'), this.scene.get('vagabond_Event_1')]
            ),
            this.generateNPC( //ayudante
                'glasses', false, 60,
                [this.scene.get('glasses_Event_0'), this.scene.get('glasses_Event_1'), this.scene.get('glasses_Event_2')]
            ),
            this.generateNPC( //extranjero
                'foreigner', false, 60,
                [this.scene.get('foreigner_Event_0'), this.scene.get('foreigner_Event_1')]
            ),
            this.generateNPC( //vendedor
                'seller', true, 60,
                [this.scene.get('seller_Event_0'), this.scene.get('seller_Event_1')]
            ),
            this.generateNPC( //niño
                'hungryKid', false, 60,
                [this.scene.get('hungryKid_Event_0')]
            ),
            this.generateNPC( //pescador
                'fisherman', true, 60,
                [this.scene.get('elder_Event_0'), this.scene.get('elder_Event_1')]
            ),
            this.generateNPC( //hermano
                'brother', false, 60,
                [this.scene.get('brother_Event_Idle'), this.scene.get('brother_Event_0')]
            ),
            this.generateNPC( //posada
                'inkKeeper', true, 60,
                [this.scene.get('inkKeeper_Event_Idle'), this.scene.get('inkKeeper_Event_0')]
            ),
            this.generateNPC( //abuela
                'elder', true, 60,
                [this.scene.get('grandmother_Event_Idle'), this.scene.get('grandmother_Event_0')]
            )
        ];

        //Añadimos la silueta con sus eventos
        this.silhouette = new Silhouette(this.matter.world, 750, 550,
            [this.scene.get('testSilueta_0'), this.scene.get('testSilueta_1'), this.scene.get('testSilueta_2'), this.scene.get('testSilueta_3'), this.scene.get('testSilueta_4'),
            this.scene.get('testSilueta_5'), this.scene.get('testSilueta_6'), this.scene.get('testSilueta_7'), this.scene.get('testSilueta_8'), this.scene.get('testSilueta_9'),
            this.scene.get('testSilueta_10'), this.scene.get('testSilueta_11')]);

            //creamos los objetivos y su marcador
        this.objectiveMarker = new ObjectiveMarker(this.matter.world, this.player);
        this.loadObjectives();

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
        // Creacion de objetos segun el Tilemap
        for (const itemPos of this.map.getObjectLayer('collectable').objects) {
            switch (itemPos.name) {
                case 'potion':
                    this.potion = new PotionItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[16], this.player);
                    break;
                case 'blessing':
                    this.blessing = new BlessingItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[2], this.player);
                    break;
                case 'sacredFire':
                    this.sacredFire = new SacredFireItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[17], this.player);
                    break;
                case 'booze':
                    this.booze = new BoozeItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[4], this.player);
                    break;
                case 'food':
                    this.flower = new FoodItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[7], this.player);
                    break;
                case 'totem':
                    this.totem = new AvoidDeathItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[0], this.player);
                    break;
            }
        }        

        //creamos la venda
        this.blindfold = new Blindfold(this, 940, 970, this.vision);

        //establecemos los bounds de comienzo con respecto al spawnpoint
        const height = this.spawnpoint.properties[0].value, heightBg = this.spawnpoint.properties[1].value,
            width = this.spawnpoint.properties[2].value, widthBg = this.spawnpoint.properties[3].value;
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(widthBg, heightBg, width, height);

        //si se presiona el espacio, cambiamos la venda
        this.player.cursorsPlayer.blindfold.on('down', () => {
            this.onBlindChange();
        });
        this.player.cursorsPlayer.interact.on('down', () => {
            if (this.auxEventHandler !== null) {
                //si se esta pulsando la tecla de interactuar, se llama al evento del npc
                let npcEvent = this.auxEventHandler.nextEvent();
                if (npcEvent !== null) 
                    this.changeScene(npcEvent);
            }
            else if (this.item !== undefined) {
                //si cogemos un item, lo insertamos en el inventario y ocultamos su tooltip
                this.item.itemPointer.setVisible(false);
                this.insertItem(this.item);
            }
        });
        this.player.cursorsPlayer.interactGhost.on('down', () => {
            if (this.blindfold.blind) {
                //si puedes hablar con la silueta (estas vendada con suficiente fe)
                if (this.player.faith >= this.objectives[this.currentObjective].faithReq) {
                    let silEvent = this.silhouette.nextEvent();
                    if (silEvent != null)
                        this.changeScene(silEvent);
                }
            }
        });
        this.player.cursorsPlayer.invToggle.on('down', () => {
            this.gui.toggleInventory(); //enseñamos el inventario
        });
        this.player.cursorsPlayer.pause.on('down', () => {
            //guardo la info entre escenas y cambio de escena
            this.infoNextScene = { player: this.player, prevSceneKey: 'level1' };
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

        //referencia al eventHandler con el que se está colisionando
        this.auxEventHandler = null;
        this.matter.world.on('collisionstart',
            (evento, cuerpo1, cuerpo2) => {
                if (cuerpo1.gameObject === this.player) {
                    if (cuerpo2.gameObject instanceof Item) {
                        this.item = cuerpo2.gameObject;
                    }
                    else if (cuerpo2.gameObject instanceof EventHandler && cuerpo2.isSensor) {
                        this.auxEventHandler = cuerpo2.gameObject;
                    }
                }
            });

        this.matter.world.on('collisionend',
            (evento, cuerpo1, cuerpo2) => {
                if (cuerpo1.gameObject === this.player) {
                    //desasignamos el item en el que estuviese (aunque no estuviese en ninguno)
                    this.item = undefined;

                    //buscamos si sale de un trigger de seccion
                    if (cuerpo2.gameObject instanceof Trigger) this.newSection(cuerpo2.gameObject);
                    //en caso de que sea un npc, ccomprobamos que salimos de su sensor, no de su colision
                    else if (cuerpo2.gameObject instanceof EventHandler && cuerpo2.isSensor) {
                        this.auxEventHandler = null;
                    }
                }
            });

        this.scene.scene.cameras.main.on('camerafadeoutcomplete', () => {
            if (this.player.death === this.player.deathState.CheckDeath) {
                //tras acabar el fadeout de muerte, vamos a la escena de muerte, y reactivamos los inputs
                this.changeScene('deathEvent_0');
                this.cameras.main.fadeIn(2000);
                this.player.enableInputs(true);
            }
        });

        this.events.on('wake', () => {
            //cada vez que la escena vuelve a estar en pantalla (tras volver de un evento)
            //la musica vuelve a sonar
            this.sound.play('mainTheme', {
                mute: false, volume: 0.5, rate: 1, detune: 0, seek: 0, loop: true, delay: 0
            });
            //si ha muerto en la escena de muerte, hacemos que el jugador reaparezca en el spawnpoint
            if (this.player !== undefined && this.player.death === this.player.deathState.Dead) {
                this.player.die(this.blindfold, this.silhouette);
            }
            else {
                //si ha sobrevivido, le damos cordura al jugador, y restauramos 
                //su estado a 'alive'
                if (this.player.death === this.player.deathState.CheckDeath) {
                    this.player.addSanity(this.player.maxSanity / 2);
                    this.deathBlindfold(this.blindfold, this.silhouette);
                    this.player.setAlive();
                }
                else { //si vuelve de un evento que no es el de muerte
                    //simplemente actualizamos el estado de la venda
                    if (!this.blindfold.blind) this.onBlindChange();
                }
            }
        });

        // Inicia la animacion de las tiles
        this.animatedTiles.init(this.map);

        //Atributos del nivel
        this.treesFound = 0;
    }
    
    //metodo para generar los event triggers en la escena de nivel 
    generateEventTriggers(smells) {
        this.triggerEvents = new Array(); //creamos el array
        for (const eventTrigger of this.map.getObjectLayer('eventTriggers').objects) {
            let stim; //agregamos cada elemento acorde a su nombre en Tiled
            let position = { 'x': eventTrigger.x, 'y': eventTrigger.y };
            switch (eventTrigger.name) {
                case 'treeSmell1':
                    stim = new treeSmell(smells, position);
                    this.triggerEvents.push(new EventTrigger(this.matter.world, position.x, position.y, 100, 100, stim,
                        [this.scene.get('sickTree_Event_Idle'), this.scene.get('sickTree_Event_0')]));
                    break;
                case 'glasses':
                    this.triggerEvents.push(new EventTrigger(this.matter.world, position.x, position.y, 100, 100, null,
                        [this.scene.get('glassesItem_Event_0')]));
                    break;
                case 'tavern':
                    this.triggerEvents.push(new EventTrigger(this.matter.world, position.x, position.y, 100, 100, null,
                        [this.scene.get('tavern_Event_Idle'), this.scene.get('tavern_Event_0')]));
                    break;
                case 'cane':
                    this.triggerEvents.push(new EventTrigger(this.matter.world, position.x, position.y, 100, 100, null,
                        [this.scene.get('cane_Event_Idle'), this.scene.get('cane_Event_0')]));
                    break;
                case 'well':
                    this.triggerEvents.push(new EventTrigger(this.matter.world, position.x, position.y, 100, 100, null,
                        [this.scene.get('well_Event_0')]));
                    break;
                case 'coins':
                    this.triggerEvents.push(new EventTrigger(this.matter.world, position.x, position.y, 100, 100, null,
                        [this.scene.get('coins_Event_0')]));
                    break;
                case 'grave':
                    this.triggerEvents.push(new EventTrigger(this.matter.world, position.x, position.y, 100, 100, null,
                        [this.scene.get('grave_Event_0')]));
                    break;
            }
        }
    }
}
