import menuBasicScene from "./menu_basic_scene.js";

//escena de pantalla final, en la que se muestra un mensaje, la fe obtenida,
//y los eventos completados
export default class infoLevel extends menuBasicScene{
    init(data){ //nos guardamos la info de la escena anterior
        this.info = data;
    }
    
    constructor(){ //constructora de la clase menu básico
        super('infoLevel');
    }

    create(){
        //lo ponemos al frente
        this.scene.bringToTop(this);
        //imagen de fondo
        this.add.image(0,0, 'scoreMenu').setOrigin(0);

        //imprimimos los datos en pantalla
        const text = this.add.text(this.cameras.main.centerX/2  - (this.cameras.main.centerX/6), this.cameras.main.centerY
        - this.cameras.main.centerY/3, this.info.mainText + '\n\n' + 
        'Eventos Completados: ' + this.info.numEvents.toString() + '/' + this.info.totalLevelEvents + '    ' + 
        'Fe obtenida: ' + this.info.obtainedFaith.toString(), { fontFamily: 'Neucha'}).setResolution(1.2).setScale(1.2);

        //creamos un boton para avanzar al siguiente nivel según el nombre que envíe la anterior escena
        const resume = this.goToSceneButton(this.cameras.main.centerX, this.cameras.main.centerY +
            this.cameras.main.centerY/3.5, 1, 'pauseMenuResume', this.info.nextLevel );
    }
}