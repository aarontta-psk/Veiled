import Blindfold from './blindfold.js';
import Player from './player.js';
import Item from './item.js';

export default class GameScene extends Phaser.Scene {
    constructor() { super({ key: 'gameScene' }) };

    preload() {
        // Carga el plugin para las tiles animadas
        this.load.scenePlugin('AnimatedTiles', './assets/plugins/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');

        this.load.spritesheet('player', './assets/sprites/player.png',
            { frameWidth: 32, frameHeight: 41 });
        this.load.image('background', './assets/sprites/background.jpg');
        this.load.image('vision', './assets/sprites/black_circle.png');
        this.load.image('blindfold', './assets/sprites/black_background.png');

        // Carga los datos del mapa.
        this.load.tilemapTiledJSON('map', './assets/sprites/tilesets/testTilemap.json');

        // Carga el tileset que contiene las texturas del mapa.
        this.load.image('tiles', './assets/sprites/tilesets/dungeonTileset.png');

        // Carga los items incluidos en la escena        
        this.load.atlas('items', 'assets/sprites/items.png?', 'assets/atlas/items.json');
    }

    create() {
        this.matter.world.disableGravity();

        // Creamos un mapa a partir de los datos en cache
        this.map = this.make.tilemap({
            key: 'map',
            tileWidth: 32,
            tileHeight: 32
        });

        // Asignamos el tileset
        const tileset = this.map.addTilesetImage('dungeon', 'tiles');

        // Capas del mapa para asignar distintas funcionalidades
        this.ground0 = this.map.createStaticLayer('ground 0', tileset);
        // Esta capa es dinámica porque incluye tiles con animaciones
        this.ground1 = this.map.createDynamicLayer('ground 1', tileset);
        this.walls = this.map.createStaticLayer('walls', tileset);

        // Spawnea al player en un punto definido en Tiled.
        // En Tiled tiene que haber una capa de objetos llamada 'capaObjetos'
        for (const objeto of this.map.getObjectLayer('objectLayer').objects) {
            // 'objeto.name' u 'objeto.type' nos llegan de las propiedades del
            // objeto en Tiled
            if (objeto.name === 'spawnPoint') {
                this.spawnpoint = objeto;
                this.player = new Player(this.matter.world, objeto.x, objeto.y);
            }
        }

        // Colocamos la vision en la posicion del jugador
        const [x, y] = [this.player.x, this.player.y];
        this.vision = this.add.image(x, y, 'vision').setVisible(false).setScale(0.4);

        // Creamos un layer estático
        this.walls2 = this.map.createStaticLayer('walls2', tileset);

        // Creacion de items a partir del atlas
        this.items = this.textures.get('items');
        this.itemFrames = this.items.getFrameNames();

        // Creacion de objetos segun el Tilemap
        for (const itemPos of this.map.getObjectLayer('collectable').objects) {            
            if (itemPos.name === 'potion') {                
                this.potion = new Item(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[0]);
            }

            if (itemPos.name === 'houseKey') {                
                this.housekey = new Item(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[1]);
            }

            if (itemPos.name === 'coin') {                
                this.coin = new Item(this.matter.world, itemPos.x, itemPos.y, this.itemFrames[2]);
            }
        }        

        // Empieza la animación de las tiles en este mapa
        this.animatedTiles.init(this.map);

        this.blindfold = new Blindfold(this, 0, 0, this.vision);

        let widthBg = 0, heightBg = 0, widthEnd = 960, heightEnd = 960;
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(widthBg, heightBg, widthEnd, heightEnd);

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
            this.scene.switch('eventManager');
        });
        this.player.cursorsPlayer.testing.on('down', event => this.respawn()) //testeo respawn

        // Colision de las paredes 
        this.walls.setCollisionByProperty({ obstacle: true });
        this.matter.world.convertTilemapLayer(this.walls);        

        this.matter.world.on('collisionactive',
            (evento, cuerpo1, cuerpo2) => {
                //console.log(cuerpo1.gameObject);
                //console.log(cuerpo2.gameObject);
                if (cuerpo1.gameObject === this.player && cuerpo2.gameObject === this.potion) {
                    console.log("overlap (potion)");
                    //tooltip true
                    //puede recogerse el item
                }

                if (cuerpo1.gameObject === this.player && cuerpo2.gameObject === this.housekey) {
                    console.log("overlap (houseKey)");
                    //tooltip true
                    //puede recogerse el item
                }

                if (cuerpo1.gameObject === this.player && cuerpo2.gameObject === this.coin) {
                    console.log("overlap (coin)");
                    //tooltip true
                    //puede recogerse el item
                }
            });
    }


    update(time, delta) {
        const [playerX, playerY] = [this.player.x, this.player.y];
        const [visionX, visionY] = [this.vision.x, this.vision.y];

        if (visionX !== playerX || visionY !== playerY) {
            this.vision.setPosition(playerX, playerY);
            this.blindfold.setVision(this.vision);
        }
        // const [playerX, playerY] = [this.player.x, this.player.y];
        // let [newVisionX, newVisionY] = [this.vision.x, this.vision.y];
        // if (playerX < this.cameras.main.width / 2 /*|| playerX > this.widthEnd - this.cameras.main.width / 2*/) {
        //     newVisionX = playerX;
        // }
        // else newVisionX = 400;
        // if (playerY < this.cameras.main.height / 2 /*|| playerY > this.heightEnd - this.cameras.main.height / 2*/) {
        //     newVisionY = playerY;
        // }
        // else newVisionX = 300;
        // if ([newVisionX, newVisionY] !== [this.vision.x, this.vision.y]) {
        //     this.vision.setPosition(playerX, playerY);
        //     this.blindfold.setVision(this.vision);
        // }        
    }

    newSection() {
        this.cameras.main.removeBounds();
        this.cameras.main.setBounds(widthBg, heightBg, widthEnd, heightEnd);
    }

    //respawn basico (falta la implementacion de varias funcionalidades)
    respawn() {
        this.player.setPosition(this.spawnpoint.x, this.spawnpoint.y);
    }
}