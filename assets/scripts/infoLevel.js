export default class infoLevel extends  Phaser.Scene{
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
    }
}