class eventScene extends Phaser.Scene {
    init(data) {
        this.info = data;
    }

    layout(options, group) {
        //variable para separar las opciones en el eje y
        let distancia = 300;
        //antes de mostrar las opciones, borro las anteriores
        group.removeAll(true);

        const mainText = this.add.text(50, 50, options[0].text, {fontFamily: 'Neucha', align: 'right'}).setResolution(1.2).setScale(1.2).setAlign('left'); 
        group.add(mainText);
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

export class painterEvent_0 extends eventScene {
    constructor() {
        super({ key: 'painterEvent_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'background';
        this.content = [
            {
                text: 'Notas, entre las fragancias del bosque cercano, el olor a colores pastel. Al acercarte, una persona se torna hacia ti. -¡Ay, no esperaba visitas! -Una voz femenina exclama- La gente no suele venir por aquí, así que suelo venir cuando quiero pintar. Sinceramente, me habría venido bien que alguien me criticase mi trabajo, pero ¡qué quisquillosa es el destino para acabar aquí tú de todas personas! Bueno, parece que tendré que esperar a otro día para encontrar a mi crítico, pero de mientras, cuéntame un poco, ¿qué te trae por estas zonas?'
            },
            {
                text: 'Conversar con la artista',
                cb: () => {},
                next: [
                    {
                        text: 'Una breve conversación trivial lleva a la artista a envolverse un poco en temas de teoría de color. Comienza a intentar explicar el amarillo como a alguien ciego, y se sorprende mucho cuando le comentas con una leve sonrisa burlona que conoces los colores.',
                    },
                    {
                        text: 'Continuar',
                        cb: () => {
                            this.info.player.addSanity(15);
                            this.completed = true;
                        }
                    }
                ]
            },
            {
                text: 'Quitar la venda para evaluar el cuadro',
                cb: () => {
                    this.info.player.addSanity(15);
                    this.completed = true;
                }
            },
        ]
    }
}

export class painterEvent_1 extends eventScene {
    constructor() {
        super({ key: 'painterEvent_1' });
        //array con los elementos de un evento
        this.backgroundImage = 'background';
        this.content = [
            {
                text: 'La pintora se queda incrédula un segundo, pero se alegra notablemente al darse cuenta de lo que esto significa. La inmensa cantidad de luz del día soleado te hace doler los ojos, pero al pasar un momento te ajustas y ves los dos paisajes, el de pastel un reflejo de la realidad, pero más saturado en sus colores, dándole un toque surreal.'
            },
            {
                text: 'Adular',
                cb: () => {},
                next: [
                    {
                        text: 'Das una crítica increíblemente positiva sobre el cuadro, sin ser realmente específico en ningún detalle, pero no obstante inundando a la joven artista con positividad. Esta está encantada con cada mención, y te regala un boceto en agradecimiento.',
                    },
                    {
                        text: 'Agradecer y aceptar regalo',
                        cb: () => {
                            this.info.player.inventory.collect('boceto');
                            this.completed = true;
                        }
                    }
                ]
            },
            {
                text: 'Crítica positiva',
                cb: () => {},
                next: [
                    {
                        text: 'Das una crítica mayoritariamente positiva sobre el cuadro, centrándote en la gama de colores tan vistosa y agradable. La artista se sonroja un poco, parece que esto era de lo que más orgullosa estaba. En este tono te confiesa que la inspiración para su estilo lo debe en parte a un caleidoscopio, el cual te regala como agradecimiento.',
                    },
                    {
                        text: 'Agradecer y aceptar regalo',
                        cb: () => {
                            this.info.player.inventory.collect('caleidoscopio');
                            this.completed = true;
                        }
                    }
                ]
            },
            {
                text: 'Crítica analítica',
                cb: () => {},
                next: [
                    {
                        text: 'Sin dejar que la amoción del momento te abrume, das tu opición más sincera sobre el cuadro, describiendo como te gusta la gama de colores, pero remarcando cómo las líneas del contorno tan marcadas mancillan el efecto de dichos colores. La artista no se lo toma mal, y con una sonrisa te da las gracias- sinceridad a cambio de sinceridad.',
                    },
                    {
                        text: 'Animar y despedir',
                        cb: () => {
                            this.info.player.addSanity(25);
                            this.completed = true;
                        }
                    }
                ]
            }
        ]
    }
}