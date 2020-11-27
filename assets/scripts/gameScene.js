import Blindfold from './blindfold.js';
import Player from './player.js';

export default class GameScene extends Phaser.Scene {
    constructor() { super({ key: 'gameScene' }) };

    preload() {
        this.load.spritesheet('player', './assets/sprites/player.png',
            { frameWidth: 32, frameHeight: 41 });
        this.load.image('background', './assets/sprites/background.jpg');
        this.load.image('vision', './assets/sprites/black_circle.png');
        this.load.image('blindfold', './assets/sprites/black_background.png');

        // Carga los datos del mapa.
        this.load.json('map', './assets/sprites/tilesets/isometricTilemap.json');

        // Carga el tileset que contiene las texturas del mapa.
        this.load.spritesheet('tiles', './assets/sprites/tilesets/isometricTileset.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {

        // Creamos un mapa a partir de los datos en cache
        /*this.map = this.make.tilemap({
            key: 'map',
            tileWidth: 64,
            tileHeight: 32
        });*/

        // Asignamos el tileset (nombre en Tiled y la textura se llaman igual mia culpa)
        //const tileset1 = this.map.addTilesetImage('holacaracola', 'tiles');

        // Capas del mapa para asignar distintas funcionalidades
        //this.ground = this.map.createStaticLayer('ground', tileset1);
        //this.wall = this.map.createStaticLayer('wall', tileset1);
        //this.roof = this.map.createStaticLayer('roof', tileset1);
        this.player = new Player(this, 400, 400);

        this.buildMap();

        this.vision = this.add.image(400, 400, 'vision').setVisible(false).setScale(0.4);

        //this.walls2 = this.map.createStaticLayer('walls2', tileset1);

        this.blindfold = new Blindfold(this, 0, 0, this.vision);

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

        // Colision entre las paredes y el player.        
        //this.wall.setCollisionByProperty({ obstacle: true });
        //this.physics.add.collider(this.player, this.wall);

        this.cameras.main.startFollow(this.player);
    }

    update(time, delta) {
        const playerPos = this.player.getPos();
        let prevVision = [this.vision.x, this.vision.y];
        if (prevVision !== playerPos) {
            this.vision.setPosition(playerPos[0], playerPos[1]);
            this.blindfold.setVision(this.vision);
        }
    }

    buildMap() {
        //  Carga los datos del mapa
        let data = this.cache.json.get('map');

        // Almacenar el tamaño de las tiles
        let tilewidth = data.tilewidth;
        let tileheight = data.tileheight;

        // Calculo para la perspectiva isometrica
        let tileWidthHalf = tilewidth / 2;
        let tileHeightHalf = tileheight / 2;

        // Recorre las layers definidas en Tiled 
        for (let r = 0; r < 3; r++) {

            // Almacena la informacion de la layer
            let layer = data.layers[r].data;

            // Dimensiones de la layer
            let mapwidth = data.layers[r].width;
            let mapheight = data.layers[r].height;

            // Calcula el punto de dibujado de la tile
            let centerX = mapwidth * tileWidthHalf;
            let centerY = 1;

            // Dibuja cada tile de la layer
            let i = 0;
            for (let y = 0; y < mapheight; y++) {
                for (let x = 0; x < mapwidth; x++) {
                    // Asigna la tile a imprimir (-1 debido a la codificacion del json)
                    let id = layer[i] - 1;

                    // Si no esta vacia, dibujamos la tile
                    if (id !== -1) {

                        // Calculo de la isometria (posicion)
                        let tx = (x - y) * tileWidthHalf;
                        let ty = (x + y) * tileHeightHalf;
                        let tile;

                        if (data.tilesets[0].tiles[id].properties[0].value) {
                            tile = this.physics.add.staticImage(centerX + tx, centerY + ty, 'tiles', id);
                            this.physics.add.collider(this.player, tile);
                        } else {
                            tile = this.add.image(centerX + tx, centerY + ty, 'tiles', id);
                        }

                        // if (data.tilesets[0].tiles[id].properties[0].value) {
                        //     //this.physics.add.existing(tile);
                        //     //tile.body.allowGravity = false;
                        //     //tile.body.moves=false;
                        //     this.physics.add.collider(this.player, tile);
                        //     console.log(this.physics.world.collide(this.player, tile));
                        //     console.log("asdfasd")
                        //     //console.log(this.player)
                        // }
                        // Layers de dibujado de Unity
                        // tile.depth = centerY + ty;
                        tile.depth = -1;
                        if (r > 0) tile.depth = 0;
                    }
                    i++;
                }
            }
        }
    }
}