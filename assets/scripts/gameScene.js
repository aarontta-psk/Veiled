import Blindfold from './blindfold.js';
import Player from './player.js';

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
                this.player = new Player(this.matter.world, objeto.x, objeto.y);
            }
        }

        // Colocamos la vision en la posicion del jugador
        let posPlayer = this.player.getPos();
        this.vision = this.add.image(400, 300, 'vision').setVisible(false).setScale(0.4);

        // Creamos un layer estático
        this.walls2 = this.map.createStaticLayer('walls2', tileset);

        // Empieza la animación de las tiles en este mapa
        this.animatedTiles.init(this.map);

        this.blindfold = new Blindfold(this, 0, 0, this.vision);

        this.cameras.main.startFollow(this.player);

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

        this.player.blindfold().on('down', event => {
            this.blindfold.setBlindfold();
        });

        this.player.interact().on('down', event => {
            this.scene.switch('eventManager');
        });

        // Colision entre las paredes y el player
        this.walls.setCollisionByProperty({ obstacle: true });
        //this.physics.add.collider(this.player, this.walls);
    }

    update(time, delta) {
        const playerPos = this.player.getPos();
        let prevVision = [this.vision.x, this.vision.y];
        if (prevVision !== playerPos) {
            this.blindfold.setVision(this.vision, playerPos[0], playerPos[1]);
        }
    }
}