export default class Boot extends Phaser.Scene {
    constructor() { super({ key: 'boot' }) };

    preload() {
        // Carga de datos de juego
        this.load.spritesheet('player', './assets/sprites/spritesheets/player_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('playerblind', './assets/sprites/spritesheets/playerblind_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('boatofficial', './assets/sprites/spritesheets/boatofficial_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('brother', './assets/sprites/spritesheets/brother_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('captain', './assets/sprites/spritesheets/captain_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('hungryKid', './assets/sprites/spritesheets/child_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('doctor', './assets/sprites/spritesheets/doctor_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('glasses', './assets/sprites/spritesheets/dude_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('elder', './assets/sprites/spritesheets/elder_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('farmer', './assets/sprites/spritesheets/farmer_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('fisherman', './assets/sprites/spritesheets/fisherman_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('foreigner', './assets/sprites/spritesheets/foreigner_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('husband', './assets/sprites/spritesheets/husband_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('lumberjack', './assets/sprites/spritesheets/lumberjack_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('painter', './assets/sprites/spritesheets/painter_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('police', './assets/sprites/spritesheets/police_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('seller', './assets/sprites/spritesheets/seller_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('inkKeeper', './assets/sprites/spritesheets/tavern_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('vagabond', './assets/sprites/spritesheets/vagabond_sheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('dad', './assets/sprites/spritesheets/dad_sheet.png',
            { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('ghost', './assets/sprites/spritesheets/oldman_sheet.png',
            { frameWidth: 128, frameHeight: 128 });

        this.load.image('itemFX', './assets/sprites/item_fx.png');
        this.load.image('vision', './assets/sprites/black_circle.png');
        this.load.image('blindfold', './assets/sprites/black_background.png');

        this.load.spritesheet('soundCircle', './assets/sprites/sound_circle.png',
            { frameWidth: 860, frameHeight: 904 });
        this.load.spritesheet('smellCloud', './assets/sprites/smell_cloud.png',
            { frameWidth: 1000, frameHeight: 649 });
        this.load.spritesheet('itemTooltip', './assets/sprites/item_tooltip.png',
            { frameWidth: 64, frameHeight: 128 });
        this.load.spritesheet('npcTooltip', './assets/sprites/npc_tooltip.png',
            { frameWidth: 64, frameHeight: 128 });
        this.load.spritesheet('lmbTooltip', './assets/sprites/lmb_tooltip.png',
            { frameWidth: 64, frameHeight: 128 });
        this.load.spritesheet('ghostTooltip', './assets/sprites/r_tooltip.png',
            { frameWidth: 64, frameHeight: 128 });

        // Carga de datos de menus
        this.load.image('pauseMenu', './assets/sprites/ui/pause_menu.png');
        this.load.image('pauseMenuResume', './assets/sprites/ui/resume_button.png');
        this.load.image('pauseMenuToMainMenu', './assets/sprites/ui/menu_button.png');
        this.load.image('back', './assets/sprites/ui/back_button.png');
        this.load.image('mainMenu', './assets/sprites/ui/main_menu.png')
        this.load.image('mainMenuPlay', './assets/sprites/ui/play_button.png');
        this.load.image('mainMenuSettings', './assets/sprites/ui/settings_button.png');
        this.load.image('mainMenuLevels', './assets/sprites/ui/levels_button.png');
        this.load.image('mainMenuLevel00', './assets/sprites/ui/level_00_button.png');
        this.load.image('mainMenuLevel01', './assets/sprites/ui/level_01_button.png');
        this.load.image('mainMenuLevel02', './assets/sprites/ui/level_02_button.png');
        this.load.image('settingsMenu', './assets/sprites/ui/settings_menu.png');
        this.load.image('scoreMenu', './assets/sprites/ui/score_menu.png');
        this.load.spritesheet('volume', './assets/sprites/ui/volume.png',
            { frameWidth: 280, frameHeight: 280 });
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
        this.load.image('keybindQ', './assets/sprites/ui/keybind_q.png');
        this.load.image('keybindE', './assets/sprites/ui/keybind_e.png');
        this.load.image('keybindR', './assets/sprites/ui/keybind_r.png');
        this.load.image('keybindSpace', './assets/sprites/ui/keybind_space.png');
        this.load.image('keybindWASD', './assets/sprites/ui/keybind_movement.png');
        this.load.image('objectiveArrow', './assets/sprites/ui/arrow.png');

        // Carga los datos del mapa.
        this.load.tilemapTiledJSON('map00', './assets/sprites/tilesets/map_00.json');
        this.load.tilemapTiledJSON('map01', './assets/sprites/tilesets/map_01.json');

        // Carga el tileset que contiene las texturas del mapa.
        this.load.image('tiles', './assets/sprites/tilesets/slates_tileset.png');
        this.load.image('interiortiles', './assets/sprites/tilesets/interior_tileset.png');

        // Carga los items incluidos en la escena        
        this.load.atlas('items', './assets/sprites/items/items.png', 'assets/sprites/items/items_atlas.json');

        // Carga el codigo para usar webfonts
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        // Carga de sonidos
        this.load.audio('mainTheme', './assets/audio/music/theme.wav');
        this.load.audio('menuSong', './assets/audio/music/menuSong.wav');
        this.load.audio('sfxActivateBlind', './assets/audio/sfx/blindfold_activate.wav');
        this.load.audio('sfxDesactivateBlind', './assets/audio/sfx/blindfold_deactivate.wav');
        this.load.audio('sfxSteps', './assets/audio/sfx/steps.wav');
        this.load.audio('sfxDeath', './assets/audio/sfx/death.wav');
        this.load.audio('sfxFaithUp', './assets/audio/sfx/faithUp.wav');
        this.load.audio('sfxOpenInventory', './assets/audio/sfx/openInventory.wav');
        this.load.audio('sfxCloseInventory', './assets/audio/sfx/closeInventory.wav');
        this.load.audio('sfxClick', './assets/audio/sfx/click.wav');
        this.load.audio('sfxPickItem', './assets/audio/sfx/pickItem.wav');
    }

    create() {
        //desactiva iput del click derecho
        this.input.mouse.disableContextMenu();

        //creacion de animaciones
        this.createAnims('player', 8);
        this.createAnims('playerblind', 8);
        this.createAnims('boatofficial', 4);
        this.createAnims('brother', 4);
        this.createAnims('captain', 4);
        this.createAnims('hungryKid', 4);
        this.createAnims('doctor', 4);
        this.createAnims('glasses', 4);
        this.createAnims('elder', 4);
        this.createAnims('farmer', 4);
        this.createAnims('fisherman', 4);
        this.createAnims('foreigner', 4);
        this.createAnims('husband', 4);
        this.createAnims('lumberjack', 4);
        this.createAnims('painter', 4);
        this.createAnims('police', 4);
        this.createAnims('seller', 4);
        this.createAnims('inkKeeper', 4);
        this.createAnims('vagabond', 4);
        this.createAnims('dad', 4);

        this.tooltipAnims('itemTooltip', 1)
        this.tooltipAnims('npcTooltip', 1);
        this.tooltipAnims('lmbTooltip', 1);

        this.anims.create({
            key: 'idle_ghost',
            frames: this.anims.generateFrameNumbers('ghost', { start: 0, end: 4 }),
            frameRate: 2,
            repeat: -1
        });

        //referencia a la escena
        const ref = this;
        // Cargamos las webfonts que se van a usar
        WebFont.load({
            google: {
                families: ['Neucha']
            },
            active: function () // se llama a esta función cuando está cargada
            {
                // Inicializacion de la escena de juego
                ref.scene.stop();
                ref.scene.run('mainMenuScene');
            }
        });

    }

    tooltipAnims(key, speed) {
        this.anims.create({
            key: key,
            frames: this.anims.generateFrameNumbers(key, { start: 0, end: 1 }),
            framerate: speed,
            repeat: -1
        });
    }

    //metodo generalizado de creacion de animaciones de movimiento por defecto
    createAnims(key, speed) {
        this.anims.create({
            key: 'idle_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 1, end: 1 }),
            frameRate: speed,
            repeat: -1
        });
        this.anims.create({
            key: 'up_move_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 9, end: 17 }),
            frameRate: speed,
            repeat: -1
        });
        this.anims.create({
            key: 'down_move_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 0, end: 8 }),
            frameRate: speed,
            repeat: -1
        });
        this.anims.create({
            key: 'left_move_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 27, end: 35 }),
            frameRate: speed,
            repeat: -1
        });
        this.anims.create({
            key: 'right_move_' + key,
            frames: this.anims.generateFrameNumbers(key, { start: 18, end: 26 }),
            frameRate: speed,
            repeat: -1
        });
    }
}