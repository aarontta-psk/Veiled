import Blindfold from './blindfold.js';
import Player from './player.js';
import Item, { PictureItem, PendantItem } from './item.js';
import Npc from './npc.js';
import Trigger from './trigger.js';
import GUI from './gui.js';
import { soundStimulus, smell } from './stimulus.js';
import Silhouette from './silhouette.js'
import NewGameScene from './game_scene.js'
import EventHandler from './event_handler.js';

const LEVEL_FAITH_REQUERIMENT = 40;

export default class Level0 extends NewGameScene {
    constructor() {
        super('level0');
    };

    preload() {
        super.preload();
    }

    create() {
        super.create();

        //maquina de estados para el preludio
        this.preludeState = {
            Talk: 'talk',
            GetItem: 'getItem',
            UseItemAndBlindfold: 'useItemAndBlindfold'
        }
        this.prelude = this.preludeState.Talk;

        // Creamos un mapa a partir de los datos en cache
        this.map = this.make.tilemap({
            key: 'map00',
            tileWidth: 64,
            tileHeight: 64
        });

        //sonidos
        this.sound.play('mainTheme', {
            mute: false, volume: 0.5, rate: 1, detune: 0, seek: 0, loop: true, delay: 0
        });

        // Asignamos el tileset
        const tileset = this.map.addTilesetImage('interior', 'interiortiles');

        // Creamos layers por debajo del jugador (probablemente deberiamos establecer una profundidad para que todo quede más limpio)
        this.map_zones = this.map.createStaticLayer('map_zones', tileset);
        this.map_limits = this.map.createStaticLayer('map_limits', tileset);
        this.ground_01 = this.map.createStaticLayer('ground_01', tileset);
        this.ground_02 = this.map.createStaticLayer('ground_02', tileset);
        this.ground_03 = this.map.createStaticLayer('ground_03', tileset);
        this.building_01 = this.map.createStaticLayer('building_01', tileset);
        this.building_02 = this.map.createStaticLayer('building_02', tileset);

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
                this.player = new Player(this.matter.world, objeto.x, objeto.y, objeto, savedFaith, 2.2);;
            }
        }

        this.gui = new GUI(this, 0, 0, this.player);

        this.soundParticle = this.add.particles('soundCircle');

        // Añado un npc de prueba en un array
        this.npcs = [
            this.dadNpc = this.generateNPC(
                'dad', true, 120,
                [this.scene.get('dad_Event_0'), this.scene.get('dad_Event_1'), this.scene.get('dad_Event_2')]
            )
        ];
        
        // Correcion de la escala del padre y su colision
        this.dadNpc.setScale(2.2);        
        this.dadNpc.body.parts[1].circleRadius=130;
        
        this.totalLevelEvents = 2;

        // Colocamos la vision en la posicion del jugador
        const [x, y] = [this.player.x, this.player.y];
        this.vision = this.add.image(x, y, 'vision').setVisible(false).setScale(0.8);

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
            if (itemPos.name === 'picture') {
                this.picture = new PictureItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[16], this.player);
                this.picture.setScale(2);
                this.picture.itemPointer.setVisible(false);
                this.itemContainer.push(this.picture);
            }
            else if (itemPos.name === 'pendant') {
                this.pendant = new PendantItem(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[14], this.player);
                this.itemContainer.push(this.pendant);
            }
        }

        this.blindfold = new Blindfold(this, 940, 970, this.vision);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(2500, 2320, 600, 840);

        this.player.cursorsPlayer.interact.on('down', event => {
            if (this.auxEventHandler !== null) {
                //si se esta pulsando la tecla de interactuar, se llama al evento del npc
                let npcEvent = this.auxEventHandler.nextEvent();
                if (npcEvent != null) {
                    if (this.player.inventory.objects.length === 0 && this.player.faith === 0) {
                        this.prelude = this.preludeState.GetItem;
                        this.picture.itemPointer.setVisible(true);
                    }
                    this.gui.wasdTooltip.setVisible(false);
                    this.gui.updateInventory(this.prelude);
                    this.changeScene(npcEvent);
                }
            }
            else if (this.prelude === this.preludeState.GetItem && this.item !== undefined) {
                this.item.itemPointer.setVisible(false);
                this.insertItem(this.item);
                this.prelude = this.preludeState.Talk;
                this.gui.updateInventory(this.prelude);
                this.gui.wasdTooltip.setVisible(true);
            }
        });

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
                        console.log("start work")
                    }
                }
            });

        this.matter.world.on('collisionend',
            (evento, cuerpo1, cuerpo2) => {
                if (cuerpo1.gameObject === this.player) {
                    if (cuerpo2.gameObject instanceof Item) {
                        //desasignamos el item en el que estuviese
                        this.item = undefined;
                    }
                    if (cuerpo2.gameObject instanceof EventHandler && cuerpo2.isSensor) {
                        this.auxEventHandler = null;
                        console.log("end work")
                    }
                }
            });

        this.events.on('wake', event => {
            //la musica vuelve a sonar
            this.sound.play('mainTheme', {
                mute: false, volume: 0.5, rate: 1, detune: 0, seek: 0, loop: true, delay: 0
            });
        });

        // Inicia la animacíon de las tiles
        this.animatedTiles.init(this.map);
    }

    update(time, delta) {
        super.update();

        if (this.player.sanity < 50)
            this.player.sanity = 50;

        this.stateChanging();
    }

    changeTooltips() {
        this.gui.arrowTooltip.setVisible(false);
        this.gui.spaceTooltip.setVisible(true);
    }

    stateChanging() {
        if (this.prelude === this.preludeState.Talk && this.player.faith === 20) {
            this.prelude = this.preludeState.UseItemAndBlindfold
            this.gui.qTooltip.setVisible(true);
            this.gui.updateInventory(this.prelude);
        }
        if (this.prelude === this.preludeState.UseItemAndBlindfold) {
            if (this.player.cursorsPlayer.invToggle.isDown & !this.gui.backgroundInventory.visible) {
                this.gui.toggleInventory();
                this.gui.arrowTooltip.setVisible(true);
                this.gui.qTooltip.setVisible(false);
            }
            else if (this.player.cursorsPlayer.blindfold.isDown && this.player.faith > 20) {
                this.blindfold.setBlindfold();
                this.dadNpc.setVisible(true);
                this.sound.play('sfxDesactivateBlind');
                this.prelude = this.preludeState.Talk;
                this.gui.wasdTooltip.setVisible(true);
                this.gui.spaceTooltip.setVisible(false);
            }
        }
    }
}