export default class Level2 extends Phaser.Scene {
    constructor() {
        super({key:'level2'});
    };

    create(){
        this.add.image(400, 300, 'letter').setScale(0.68);
    }
}