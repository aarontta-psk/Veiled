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
                this.spawnpoint = objeto;
                this.player = new Player(this.matter.world, objeto.x, objeto.y);
            }
        }

        // Colocamos la vision en la posicion del jugador
        const [x, y] = this.player.getPos();
        this.vision = this.add.image(x, y, 'vision').setVisible(false).setScale(0.4);

        // Creamos un layer estático
        this.walls2 = this.map.createStaticLayer('walls2', tileset);

        // Empieza la animación de las tiles en este mapa
        this.animatedTiles.init(this.map);

        this.blindfold = new Blindfold(this, 0, 0, this.vision);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 960, 960);

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
            //guardo la info entre escenas y cambio de escena
            this.info = {player: this.player, prevScene: this};
            this.scene.sleep();
            this.scene.run('testEvent', this.info);
            this.resetInputs();
        });
        this.player.cursorsPlayer.testing.on('down', event => this.respawn()) //testeo respawn

        // Colision entre las paredes y el player
        this.walls.setCollisionByProperty({ obstacle: true });
        this.matter.world.convertTilemapLayer(this.walls);
    }

    update(time, delta) {
        console.log(this.player.cursorsPlayer.interact.isDown);
        const playerPos = this.player.getPos();
        const prevVision = [this.vision.x, this.vision.y];
        if (prevVision !== playerPos) {
            this.vision.setPosition(playerPos[0], playerPos[1]);
            this.blindfold.setVision(this.vision);
        }
    }

newSection(){
    this.cameras.main.removeBounds();
    this.cameras.main.setBounds(0, 0, 1920, 1080);
}

    //respawn basico (falta la implementacion de varias funcionalidades)
    respawn(){
        this.player.setPosition(this.spawnpoint.x, this.spawnpoint.y);
    }

    //metodo para que el personaje no se quede pillado al moverse o al hacer otra accion
    resetInputs(){
        // console.log(this.player.cursorsPlayer.interact.isDown);
        // this.player.cursorsPlayer.interact.reset();
        // console.log(this.player.cursorsPlayer.interact.isDown);
        // esto no funciona porque las keys no estan en un array
        // for(const property of this.player.cursorsPlayer){
        //     property.reset();
        // }
        //hasta que vea como hacerlo lo hago uno por uno
        this.player.cursorsPlayer.up.reset();
        this.player.cursorsPlayer.down.reset();
        this.player.cursorsPlayer.left.reset();
        this.player.cursorsPlayer.right.reset();
        this.player.cursorsPlayer.interact.reset();
        this.player.cursorsPlayer.blindfold.reset();
        this.player.cursorsPlayer.testing.reset();
    }
}