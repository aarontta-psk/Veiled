class Event extends Phaser.Scene{

    constructor(){
        super({key:'Event'});
    }

    preload(){
        this.load.image('background', 'assets/sprites/city.png');
    }
    
    create(){
        let background = this.add.image(0, 0, 'background');
        background.setOrigin(0, 0);

        let title_text = this.add.text(100, 100, 'Event text');
    }
}

export default Event;