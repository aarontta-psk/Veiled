//clase evento de texto de la que heredan el resto de eventos del juego
export default class eventScene extends Phaser.Scene {
    //se recibe informacion al cambiar a esta escena
    init(data) {
        this.info = data;
    }

    //metodo recursivo que muestra un texto que representa una situacion en el juego con posibles opciones a responder
    layout(options, group) {
        this.scene.bringToTop(); //se pone la escena la primera en el orden para ver las escenas
        //variable para separar las opciones en el eje y
        let distance = 270;
        let separation = 70;
        //antes de mostrar las opciones, borro las anteriores
        group.removeAll(true);

        //texto principal del evento
        const mainText = this.add.text(this.cameras.main.width*0.08, 60, options[0].text, {
            fontFamily: 'Neucha',
            wordWrap: {width: this.cameras.main.width*0.65, useAdvancedWrap: true}
        }).setResolution(1.2).setScale(1.3).setAlign('left'); //se cambia su resolucion y escala para que sea legible
        //lo añado al container para borrarlo mas adelante
        group.add(mainText);
        //para cada opcion a responder
        for (let i = 1; i < options.length; i++) {
            //añado un texto
            const optionText = this.add.text(this.cameras.main.width*0.08, distance, options[i].text, {
                fontFamily: 'Neucha',
                color: '#000000',
                wordWrap: {width: this.cameras.main.width*0.72, useAdvancedWrap: true} //parametro para que el texto haga sus saltos de linea pertinentes
            }).setInteractive().setResolution(1.6).setScale(1.6);
            //lo añado al container para borrarlo mas adelante
            group.add(optionText);
            //aumento la distancia entre las opciones
            distance += separation;

            //al escoger una de las opciones
            optionText.on('pointerdown', () => {
                this.sound.play('sfxClick');
                //si no tienen condicion, o la tienen y esta se ha cumplido
                if (options[i].condition === undefined || (options[i].condition !== undefined && options[i].condition(this))) {
                    //llamo a su callback, si lo tiene
                    if(options[i].cb !== undefined) options[i].cb();
                    //si no se ha terminado el nivel
                    if(options[i].end === undefined){
                        //se llama de nuevo recursivamente a la funcion con el contenido de next
                        if (options[i].next !== undefined) this.layout(options[i].next, group);
                        //en caso contrario
                        else {
                            //se para la escena del evento
                            this.scene.stop();
                            //continuamos la escena del juego
                            this.scene.wake(this.info.prevScene.scene.key);
                        }
                    }
                }
                else {
                    //si no se cumple la condicion se cambia el texto
                    optionText.setText(options[i].failedText);
                }
            });
        }
    }

    create() {
        //se marca el evento como no completado
        this.completed = false;

        //imprimo la imagen de fondo
        this.background = this.add.image(0, 0, this.backgroundImage);
        this.background.displayHeight = this.sys.game.canvas.height;//game.config.displayHeight;
        this.background.displayWidth = this.sys.game.canvas.width;//game.config.displayWidth;
        this.background.setOrigin(0, 0);


        //creo un container que contendra las respuestas
        let group = this.add.container();
        //llamo al metodo que muestra las opciones
        this.layout(this.content, group);
    }

    //metodo para completar un evento cualquiera
    completeEvent(sanityToAdd, faithToAdd) {
        this.info.player.addSanity(sanityToAdd); //se añade cordura
        if(faithToAdd !== 0) this.info.player.addFaith(faithToAdd); //se añade fe si es distinto
        this.info.player.numCompletedEvents++; //se aumenta el numero de eventos completados
        this.completed = true; //se marca el evento como completado
        this.sound.play('sfxFaithUp') //se reproduce el sonido de terminar un evento
    }

    //metodo para completar un evento principal
    completeMainEvent(sanityToAdd, faithToAdd){
        this.info.prevScene.nextObjective(); //se actualiza el siguiente objetivo
        this.info.prevScene.silhouette.nextEvent().completed = true; //se completa el evento en el que esta la silueta
        this.completeEvent(sanityToAdd, faithToAdd); //se completa el evento
    }
}
