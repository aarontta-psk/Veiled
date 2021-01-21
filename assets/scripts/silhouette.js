import EventHandler from './event_handler.js'

//clase que en el juego representa al padre con el que puedes hablar
export default class Silhouette extends EventHandler { 
    constructor(world, x, y, eventList) {
        super(world, x, y, 'ghost', eventList); //hereda de eventHandler, contiene una lista de eventos de las clases eventScene
        
        this.scene.add.existing(this); //lo añades en la escena
        this.setScale(0.8);
        this.setScrollFactor(0); //evitamos que se mueva con la camara
        this.setVisible(true);
        this.setDepth(11);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta); //preupdate para animaciones

        if (this.visible) this.play('idle_' + this.frame.texture.key, true); //reproducimos su animacion
    }

    //metodo para alternar la visibilidad del sprite
    toggle(blind){
        this.setActive(blind);
        this.setVisible(blind);
    }
}