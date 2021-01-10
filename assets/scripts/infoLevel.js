export default class infoLevel extends Phaser.Scene{
    init(data){
        this.info = data;
    }
    
    constructor(){
        super({key: 'infoLevel'});
    }

    create(){
        this.scene.bringToTop(this);
        // this.faithObtained = this.scene.add.text(665, 85, 'faithObtained: ' + toString(this.info.obtainedFaith), {
        //     fontFamily: 'Neucha',
        //     color: '#ffffff'
        // }).setResolution(2).setScale(1.3).setScrollFactor(0).setDepth(11);
        console.log('fe:', this.info.obtainedFaith, 'Eventos Completados:', this.info.completedEvents);
        const events = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - this.cameras.main.centerY/3, 'Eventos Completados: ' + this.info.numEvents.toString(), 
        { fontFamily: 'Neucha'}).setOrigin(0).setResolution(1.2).setScale(1.2).setAlign('left');
        const faith = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - this.cameras.main.centerY*2/3, 'Fe obtenida: ' + this.info.obtainedFaith.toString(), 
        { fontFamily: 'Neucha'}).setOrigin(0).setResolution(1.2).setScale(1.2).setAlign('left');
        const resume = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'pauseMenuResume').setInteractive();

        //callbacks del boton:
        //pointerover
        resume.on('pointerover', event => { resume.setScale(1.2); });
        //pointerout
        resume.on('pointerout', event => { resume.setScale(1); });
        //pointerdown
        resume.on('pointerdown', event => {
            this.scene.stop();
            this.scene.run(this.info.nextLevel, this.info);
        });
    }
}