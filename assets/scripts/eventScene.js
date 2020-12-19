class eventScene extends Phaser.Scene {
    init(data) {
        this.info = data;
    }

    layout(options, group) {
        //variable para separar las opciones en el eje y
        let distancia = 300;
        //antes de mostrar las opciones, borro las anteriores
        group.removeAll(true);

        this.add.text(50, 50, options[0].text, {fontFamily: 'Neucha', align: 'right'}).setResolution(2).setScale(2).setAlign('left'); 

        //para cada opcion
        for (let i = 1; i < options.length; i++) {
            console.log(options);
            //añado un texto
            const optionText = this.add.text(50, distancia, options[i].text,{fontFamily: 'Neucha'}).setInteractive().setResolution(2).setScale(2);
            //lo añado al container para borrarlo mas adelante
            group.add(optionText);
            distancia += 75;
            
                
            //llamo a un callback en caso de que sea pulsado
            optionText.on('pointerdown', () => {
                if (options[i].condition === undefined || (options[i].condition !== undefined && options[i].condition(this)))
                {   
                    options[i].cb();
                    //si el evento continua, se llama de nuevo a la funcion
                    if (options[i].next !== undefined) this.layout(options[i].next, group);
                    else {
                        this.scene.stop();
                        this.scene.run(this.info.prevScene.scene.key);
                    }
                }
                else
                {
                    optionText.setText(options[i].failedText);
                }
            });
        }
    }

    create() {
        // this.info = this.scene.get('gameScene').info;

        this.completed = false;

        //imprimo la imagen de fondo
        this.background = this.add.image(0, 0, this.backgroundImage);
        this.background.displayHeight = this.sys.game.canvas.height;//game.config.displayHeight;
        this.background.displayWidth = this.sys.game.canvas.width;//game.config.displayWidth;
        this.background.setOrigin(0,0);
        

        //creo un container que contendra las respuestas
        let group = this.add.container();
        //llamo al metodo que muestra las opciones
        this.layout(this.content, group);
    }
}

export class testEvent extends eventScene {
    constructor() {
        super({ key: 'testEvent' });
        //array con los elementos de un evento
        this.backgroundImage = 'background';
        this.content = [
            {
                text: 'El leñador está cansado. Lleva todo el día depurando código en VSCode y está un poco hasta los huevos en realidad. Cómo le gustaría poder pasarse unas vacaciones relajadas para descansar y volver fuerte en enero para los exámenes, pero tiene que hacer malabares con proyectos simultáneos de c++, js y Blender. Le molaría bastante si le restaurases sus ganas de vivir.'
            },
            {
                condition: function(ref){
                    return (ref.info.player.inventory.contains('pocion'))
                },
                failedText: 'No tienes la llave.',
                text: 'escribir en consola',
                cb: () => {
                    console.log('opcion 1 pulsada');
                }
            },
            {
                text: 'continuacion de este evento',
                cb: () => {
                    console.log('opcion 2 pulsada');
                },
                next: [
                    {
                        text: 'otro evento mas wow',
                        cb: () => {
                            console.log('texto dentro de next pulsado');
                        }
                    }
                ]
            },
            {
                text: 'Do a barrel roll',
                cb: () => {
                    console.log('opcion 3 pulsada');
                    console.log("jugador modificable, se ha pasado a esta escena", this.info.player)
                    this.info.player.setScale(0.8, 0.8);
                }
            },
            {
                text: 'completar evento',
                cb: () => {
                    console.log('opcion 4 pulsada');
                },
                next: [
                    {
                        text: 'ok',
                        cb: () => {
                            this.completed = true;
                         }
                    }
                ]
            }
        ]
    }
}

export class anotherTestEvent extends eventScene {
    constructor() {
        super({ key: 'anotherTestEvent' });
        //array con los elementos de un evento
        this.keyImage = '';
        this.content = [
            {
                text: 'ejemplo de que se pueden hacer varios npcs',
                cb: () => {
                    console.log('opcion 1 pulsada');
                },
                next: [
                    {
                        text: 'gracias por el dato crack',
                        cb: () => {
                            this.completed = true;
                        }
                    }
                ]
            }
        ]
    }
}