export default class Boot extends Phaser.Scene {
    constructor() { super({ key: 'boot' }) };

    preload() {
        this.load.spritesheet('player', './assets/sprites/player.png',
            { frameWidth: 32, frameHeight: 41 });
        this.load.image('background', './assets/sprites/background.jpg');
        this.load.image('vision', './assets/sprites/black_circle.png');
        this.load.image('blindfold', './assets/sprites/black_background.png');
        this.load.image('pauseMenu', './assets/sprites/pauseMenu.png');
        
        this.load.image('invBack', './assets/sprites/ui/inventory_bar.png');
        this.load.image('sanityBar', './assets/sprites/ui/sanity.png');
        this.load.image('sanityBarBack', './assets/sprites/ui/sanity_back.png');
        this.load.image('keybindQ', './assets/sprites/ui/key_Q.png');
        this.load.image('keybindE', './assets/sprites/ui/key_E.png');
        this.load.image('keybindSpace', './assets/sprites/ui/key_Space.png');

        // Carga los datos del mapa.
        this.load.tilemapTiledJSON('map', './assets/sprites/tilesets/testTilemap.json');

        // Carga el tileset que contiene las texturas del mapa.
        this.load.image('tiles', './assets/sprites/tilesets/dungeonTileset.png');

        // Carga los items incluidos en la escena        
        this.load.atlas('items', 'assets/sprites/items.png?', 'assets/sprites/atlas/items.json');
    }

    create() {
        this.scene.start('gameScene');
    }
}