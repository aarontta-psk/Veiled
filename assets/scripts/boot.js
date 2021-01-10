export default class Boot extends Phaser.Scene {
    constructor() { super({ key: 'boot' }) };

    preload() {
        // Carga de datos de juego
        this.load.spritesheet('player', './assets/sprites/player_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('lumberjack', './assets/sprites/lumberjack_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('painter', './assets/sprites/painter_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('doctor', './assets/sprites/doctor_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.image('ghost', './assets/sprites/ghost.png');        
        this.load.image('vision', './assets/sprites/black_circle.png');
        this.load.image('blindfold', './assets/sprites/black_background.png');
        this.load.spritesheet('soundCircle', './assets/sprites/sound_circle.png',
        { frameWidth: 860, frameHeight: 904 });
        this.load.spritesheet('smellCloud', './assets/sprites/smell_cloud.png',
        { frameWidth: 1000, frameHeight: 649 });

        // Carga de datos de menus
        this.load.image('pauseMenu', './assets/sprites/ui/pause_menu.png');
        this.load.image('pauseMenuResume', './assets/sprites/ui/resume_button.png');
        this.load.image('pauseMenuToMainMenu', './assets/sprites/ui/menu_button.png');
        this.load.image('back', './assets/sprites/ui/back_button.png');
        this.load.image('mainMenu', './assets/sprites/ui/main_menu.png')
        this.load.image('mainMenuPlay', './assets/sprites/ui/play_button.png');
        this.load.image('mainMenuOptions', './assets/sprites/ui/settings_button.png');
        this.load.spritesheet('volume', './assets/sprites/ui/volume.png',
        {frameWidth: 280, frameHeight: 280});
        this.load.image('keybindsButton', './assets/sprites/ui/keybinds_button.png');
        this.load.image('keybinds', './assets/media/keybinds.png');

        this.load.image('eventMenu', './assets/sprites/ui/event_menu.png');
        this.load.image('mainEventMenu', './assets/sprites/ui/main_event_menu.png');
        this.load.image('secondaryEventMenu', './assets/sprites/ui/secondary_event_menu.png');

        // Carga de datos de interfaz
        this.load.image('invBack', './assets/sprites/ui/inventory_bar.png');
        this.load.image('sanityBar', './assets/sprites/ui/sanity.png');
        this.load.image('sanityBarBack', './assets/sprites/ui/sanity_back.png');
        this.load.image('faithBar', './assets/sprites/ui/faith.png');
        this.load.image('keybindQ', './assets/sprites/ui/key_Q.png');
        this.load.image('keybindE', './assets/sprites/ui/key_E.png');
        this.load.image('keybindSpace', './assets/sprites/ui/key_Space.png');

        // Carga los datos del mapa.
        this.load.tilemapTiledJSON('map', './assets/sprites/tilesets/map_01.json');

        // Carga el tileset que contiene las texturas del mapa.
        this.load.image('tiles', './assets/sprites/tilesets/slates64Tileset.png');

        // Carga los items incluidos en la escena        
        this.load.atlas('items', './assets/sprites/items.png?', 'assets/sprites/atlas/items.json');

        // Carga el codigo para usar webfonts
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        // Carga de sonidos
        this.load.audio('mainTheme', './assets/audio/music/theme.mp3');
        this.load.audio('menuSong', './assets/audio/music/menuSong.mp3');
    }

    create() {
        // Cargamos las webfonts que se van a usar
        WebFont.load({
            google: {
                families: ['Neucha']
            },
        });

        // Inicializacion de la escena de juego
        this.scene.stop();
        this.scene.run('mainMenuScene');
    }
}