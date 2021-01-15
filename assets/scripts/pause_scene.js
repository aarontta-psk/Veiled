import menuBasicScene from "./menu_basic_scene.js";

export default class pauseScene extends menuBasicScene {
    init(data) {
        this.info = data;
    }

    constructor() {
        super('pauseScene');
    }

    create() {
        this.scene.bringToTop();
        let background = this.add.image(0, 0, 'pauseMenu').setOrigin(0);
        background.setPosition(this.cameras.main.centerX - background.width/2, this.cameras.main.centerY - background.height/2);

        const resume = this.returnButton(this.cameras.main.centerX, this.cameras.main.centerY -40, 1, this.info);
        const exit = this.returnToMenuButton(this.cameras.main.centerX, this.cameras.main.centerY + 30, 1, this.info);
        const options = this.optionsButton(this.cameras.main.centerX, this.cameras.main.centerY + 100, 0.5).setScale(0.5);
    }
}