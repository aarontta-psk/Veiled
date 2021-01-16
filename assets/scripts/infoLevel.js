import menuBasicScene from "./menu_basic_scene.js";

export default class infoLevel extends menuBasicScene{
    init(data){
        this.info = data;
    }
    
    constructor(){
        super('infoLevel');
    }

    create(){
        this.scene.bringToTop(this);
        // this.faithObtained = this.scene.add.text(665, 85, 'faithObtained: ' + toString(this.info.obtainedFaith), {
        //     fontFamily: 'Neucha',
        //     color: '#ffffff'
        // }).setResolution(2).setScale(1.3).setScrollFactor(0).setDepth(11);
        //imagen de fondo
        this.add.image(0,0, 'scoreMenu').setOrigin(0);

        const text = this.add.text(this.cameras.main.centerX/2  - (this.cameras.main.centerX/6), this.cameras.main.centerY  - this.cameras.main.centerY/3,
        this.info.mainText + '\n\n' + 
        'Eventos Completados: ' + this.info.numEvents.toString() + '/' + this.info.totalLevelEvents + '    ' + 
        'Fe obtenida: ' + this.info.obtainedFaith.toString(), { fontFamily: 'Neucha'}).setResolution(1.2).setScale(1.2);

        const resume = this.goToSceneButton(this.cameras.main.centerX, this.cameras.main.centerY + this.cameras.main.centerY/3.5, 1, 'pauseMenuResume', 'level2' );
    }
}