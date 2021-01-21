import EventHandler from './event_handler.js'

//clase usada como triggers para el cambio de sección en el mapa
export default class Trigger extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, width, height, key){ //constructora de sprite
        super(world, x, y, key);  
        this.setBody({
            type: 'rectangle',
            width: width,
            height: height        
        });

        this.scene.add.existing(this); //se añade a la escena
        this.scene.matter.add.sprite(this);  //se añade a matter
        this.setVisible(false);
        this.setStatic(true);
        this.setSensor(true); //se hace sensor para que funcione como un trigger
        
        this.info = []; //array con los bounds originales
        this.newBounds = []; //bounds que cambian cada vez que se haga una transicion en el mapa
    }
}

//clase que es un trigger que puede lanzar eventos de texto al interactuar con el
export class EventTrigger extends EventHandler {
    constructor(world, x, y, width, height, stimulus, events, key){
        super(world, x, y, key, events); //hereda de eventHandler, contiene una lista de eventos de las clases eventScene
        
        this.setBody({
            type: 'rectangle',
            width: width,
            height: height        
        });

        this.stimulus = stimulus; //se le puede asignar un estimulo

        this.scene.add.existing(this); //se añade a la escena
        this.scene.matter.add.sprite(this); //se añade a matter
        this.setVisible(false);
        this.setStatic(true);
        this.setSensor(true); //se hace sensor para que funcione como un trigger
    }
}