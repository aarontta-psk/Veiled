const DEATH_PROBABILITY = 0.6;

class eventScene extends Phaser.Scene {
    init(data) {
        this.info = data;
    }

    layout(options, group) {
        this.scene.bringToTop();
        //variable para separar las opciones en el eje y
        let distancia = 340;
        //antes de mostrar las opciones, borro las anteriores
        group.removeAll(true);

        const mainText = this.add.text(50, 50, options[0].text, { fontFamily: 'Neucha', align: 'right' }).setResolution(1.2).setScale(1.2).setAlign('left');
        group.add(mainText);
        //para cada opcion
        for (let i = 1; i < options.length; i++) {
            //console.log(options);
            //añado un texto
            const optionText = this.add.text(44, distancia, options[i].text, { fontFamily: 'Neucha' }).setInteractive().setResolution(1.6).setScale(1.6);
            //lo añado al container para borrarlo mas adelante
            group.add(optionText);
            distancia += 75;


            //llamo a un callback en caso de que sea pulsado
            optionText.on('pointerdown', () => {
                if (options[i].condition === undefined || (options[i].condition !== undefined && options[i].condition(this))) {
                    options[i].cb();
                    //si el evento continua, se llama de nuevo a la funcion
                    if (options[i].next !== undefined) this.layout(options[i].next, group);
                    //en caso contrario
                    else {
                        //si se ha conseguido cierto nivel de fe
                        // if(this.info.player.faith > 39){
                        //     this.info.prevScene.scene.stop();
                        //     this.scene.stop();
                        //     this.scene.run('infoLevel', {obtainedFaith: this.info.player.faith, completedEvents: this.info.player.numCompletedEvents});
                        // }
                        // else{
                            //en caso contrario volvemos a la escena anterior
                            this.scene.stop();
                            // this.scene.resume(this.info.prevScene.scene.key);
                            this.scene.wake(this.info.prevScene.scene.key);
                        // }
                    }
                }
                else {
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
        this.background.setOrigin(0, 0);


        //creo un container que contendra las respuestas
        let group = this.add.container();
        //llamo al metodo que muestra las opciones
        this.layout(this.content, group);
    }

    completeEvent(sanityToAdd, faithToAdd) {
        this.info.player.addSanity(sanityToAdd);
        this.info.player.addFaith(faithToAdd);
        this.info.player.numCompletedEvents++;
        this.completed = true;
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
                condition: function (ref) {
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
                text: 'Notas, entre las fragancias del bosque cercano, el olor a colores pastel. Al acercarte, una persona\n' +
                    'se torna hacia ti. -¡Ay, no esperaba visitas! -Una voz femenina exclama- La gente no suele venir por\n' +
                    'aquí, así que suelo venir cuando quiero pintar. Sinceramente, tenía alguna ilusión por que que alguien\n' +
                    'me criticase mi trabajo, pero ¡qué quisquillosa es el destino para acabar aquí tú de todas personas!\n\n' +
                    '-Bueno, parece que tendré que esperar a otro día para encontrar a mi crítico, pero de mientras,\n' +
                    'cuéntame un poco, ¿qué te trae por estas zonas?'
            },
            {
                text: 'Conversar con la artista',
                cb: () => { },
                next: [
                    {
                        text: 'Una breve conversación trivial lleva a la artista a envolverse un poco en temas de teoría de color.\n' +
                            'Comienza a intentar explicar el amarillo como a alguien ciego, y se sorprende mucho cuando le\n' +
                            'comentas con una leve sonrisa burlona que conoces los colores.',
                    },
                    {
                        text: 'Continuar',
                        cb: () => {
                            this.completeEvent(15,0);
                        }
                    }
                ]
            },
            {
                text: 'Quitar la venda para evaluar el cuadro',
                cb: () => {
                    this.completeEvent(15,0);
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
                text: 'La pintora se queda incrédula un segundo, pero se alegra notablemente al darse cuenta de lo que\n' +
                    'esto significa. La inmensa cantidad de luz del día soleado te hace doler los ojos, pero al pasar un\n' +
                    'momento te ajustas y ves los dos paisajes, el de pastel un reflejo de la realidad, pero más saturado\n' +
                    'en sus colores, dándole un toque surreal.'
            },
            {
                text: 'Adular',
                cb: () => { },
                next: [
                    {
                        text: 'Das una crítica increíblemente positiva sobre el cuadro, sin ser realmente específico en ningún\n' +
                            'detalle, pero no obstante inundando a la joven artista con positividad. Esta está encantada con\n' +
                            'cada mención, y te regala un boceto en agradecimiento.',
                    },
                    {
                        text: 'Agradecer y aceptar regalo',
                        cb: () => {
                            this.info.player.inventory.collect('boceto');
                            this.completeEvent(0,20);
                        }
                    }
                ]
            },
            {
                text: 'Crítica positiva',
                cb: () => { },
                next: [
                    {
                        text: 'Das una crítica mayoritariamente positiva sobre el cuadro, centrándote en la gama de colores tan\n' +
                            'vistosa y agradable. La artista se sonroja un poco, parece que esto era de lo que más orgullosa\n' +
                            'estaba. En este tono te confiesa que la inspiración para su estilo lo debe en parte a un\n' +
                            'caleidoscopio, el cual te regala como agradecimiento.',
                    },
                    {
                        text: 'Agradecer y aceptar regalo',
                        cb: () => {
                            this.info.player.inventory.collect('caleidoscopio');
                            this.completeEvent(0,20);
                        }
                    }
                ]
            },
            {
                text: 'Crítica analítica',
                cb: () => { },
                next: [
                    {
                        text: 'Sin dejar que la amoción del momento te abrume, das tu opición más sincera sobre el cuadro,\n' +
                            'describiendo como te gusta la gama de colores, pero remarcando cómo las líneas del contorno tan\n' +
                            'marcadas mancillan el efecto de dichos colores. La artista no se lo toma mal, y con una sonrisa\n' +
                            'te da las gracias- sinceridad a cambio de sinceridad.',
                    },
                    {
                        text: 'Animar y despedir',
                        cb: () => {
                            this.completeEvent(30,20);
                        }
                    }
                ]
            }
        ]
    }
}

export class painterEvent_2 extends eventScene {
    constructor() {
        super({ key: 'painterEvent_2' });
        //array con los elementos de un evento
        this.backgroundImage = 'background';
        this.content = [
            {
                text: '-Creo que seguiré pintando hasta que anochezca.'
            },
            {
                text: 'Sonreírle y continuar',
                cb: () => { },
            }
        ]
    }
}

export class doctorEvent_0 extends eventScene {
    constructor() {
        super({ key: 'doctorEvent_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'background';
        this.content = [
            {
                text: 'El olor a tabaco viejo te alerta a la presencia del doctor Abel, sentado como de costumbre en\n' +
                    'el portal de su casa, perdido en sus pensamientos. No es hasta que le saludas que se alerta\n' +
                    'a tu presencia, pero cuando lo hace, su sonrisa es audible. Se levanta y, antes de que puedas\n' +
                    'reaccionar, te envuelve en un abrazo. Tras calmarse un poco el aire, os envolvéis en una larga\n' +
                    'conversación para poneos al día. El doctor consigue resumir en breve más de una década de\n' +
                    'ocurrencias en el pueblo, y luego escucha pacientemente mientras le relatas la reciente milagrosa\n' +
                    'recuperación de tu vista.\nSe queda pensativo un tiempo antes de ofrecerte su consejo: \n\n' +
                    '-¿Y tú rechazas este milagro? Entendible. Me imagino que muchos harían lo mismo, o peor.\n' +
                    'Pero te veo ahora con esta venda, y no puedo dejar de pensar que realmente no has perdido nada.'
            },
            {
                text: 'Estar de acuerdo',
                cb: () => { },
                next: [
                    {
                        text: '-¿Ves? -responde el doctor- Realmente no necesitabas que te dijera yo esto, me imagino que habrías\n' +
                            'llegado a la misma conclusión tú sola. Y si tú prefieres mantenerte para siempre en las tinieblas,\n' +
                            'estoy seguro de que volveras a ser tan feliz como siempre fuiste. Pero te urgiría, aunque sea muy\n' +
                            'poco a poco, a que al menos probases quitártela, por unos momentos a la vez, y te permitas aprender\n' +
                            'a valorar la belleza del mundo visual. Y si te disgusta o te decepciona, siempre podrás ponerte la\n' +
                            'venda y volver a la oscuridad.'
                    },
                    {
                        text: 'Asentir y despedirte del viejo doctor',
                        cb: () => {
                            //this.info.player.enableBlindfold();
                            this.completeEvent(15,20);
                        }
                    }
                ]
            },
            {
                text: 'Preguntar a qué se refiere',
                cb: () => { },
                next: [
                    {
                        text: '-Digo que, aunque no te sientas cómoda con este mundo visual, siempre podrás simplemente ponerte\n' +
                            'de nuevo la venda y volver a la oscuridad. Así, que, si tu decides, puedes continuar con tu vida como\n' +
                            'antes. Y si tú quieres vivir así, eso está bien, pero te aconsejaría también que te atrevas, aunque solo\n' +
                            'por momentos, a quitárte esa tela y permitirte conocer al mundo en el que vivimos los demás.\n\n' +
                            'Creo que tú tienes ahora una oportunidad única para experimentar dos realidades, con el poder en\n' +
                            'tus manos para moverte entre ellas.',
                    },
                    {
                        text: 'Dar las gracias y aceptar consejo',
                        cb: () => {
                            //this.info.player.enableBlindfold();
                            this.completeEvent(15,20);
                        }
                    }
                ]

            },
        ]
    }
}

export class doctorEvent_1 extends eventScene {
    constructor() {
        super({ key: 'doctorEvent_1' });
        //array con los elementos de un evento
        this.backgroundImage = 'background';
        this.content = [
            {
                text: 'El doctor suelta una risita cuando te vuelves a acercar \n' +
                '-No necesitas oír más a este viejo. Si en realidad yo sé muy poco, solo que hablo mucho. ¡Ja! Ese es \n' + 
                'el secreto para que te llamen sabio.'
            },
            {
                text: 'Reír al comentario y continuar',
                cb: () => { },
            }
        ]
    }
}

//Evento de paso de nivel
export class maxFaithEvent_0 extends eventScene {
    constructor() {
        super({ key: 'maxFaithEvent_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'background';
        this.content = [
            {
                text: 'Tus acciones se ven recompensadas. Sientes como a medida que ayudas a otras personas tu fe \n' +
                    'aumenta. Y eso te hace feliz (porfavor reescribir esta parte pls)'
            },
            {
                text: 'Avanzar al siguiente nivel',
                cb: () => {
                    this.completeEvent(0, 0);
                    //este evento no cuenta para el numero de eventos completados
                    this.info.player.numCompletedEvents--;
                    this.scene.stop();
                    this.scene.run('infoLevel', { player: this.info.player })
                }
            }
        ]
    }
}

//Evento de paso de nivel
export class deathEvent_0 extends eventScene {
    constructor() {
        super({ key: 'deathEvent_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'background';
        this.content = [
            {
                text: 'No te sientes bien. Te sientes perdida y confusa. Poco a poco vas perdiendo tus fuerzas'
            },
            {
                text: 'No resistirse',
                cb: () => {
                    this.info.player.setDead();
                    this.completeEvent(0,0);
                },
                next: [
                    {
                        text: 'Decides rendirte. Todo se vuelve borroso y te desmayas \n' +
                        'Te despiertas en otro lugar sientiéndote menos segura.'
                    },
                    {
                        text: 'Levantarse',
                        cb: () => {
                            this.info.player.addFaith(-5);
                            this.info.player.setDead();
                        }      
                    }
                ]
            },
            {
                condition: function (ref) {
                    return (ref.info.player.inventory.contains('Figura tallada'))
                },
                failedText: 'No tienes la figura tallada',
                text: 'Aferrarse a la figura tallada',
                cb: () => {},
                next: [
                    {
                        text: 'Agarras con fuerza la figura y percibes su forma humana a través del tacto. \n' +
                        'Al hacerlo te sientes algo mejor, pero has apretado tanto la figura que se parte en trozos.'
                    },
                    {
                        text: 'Reincorporarse',
                        cb: () => {
                            this.info.player.inventory.removeObjectByKey('Figura tallada');
                            this.info.player.setAlive();
                        },
                    }
                ]
            },
            {
                text: 'Resistirse desesperadamente',
                cb: () => {
                    console.log('hola', this.content[3]);
                    // if(Math.random() > 0.6) this.info.player.setDead();
                    // else this.info.player.setAlive();
                    if(Math.random() > DEATH_PROBABILITY) {
                        this.content[3].next = [
                            {
                                text: 'Intentas mantenerte de pie con todas tus fuerzas, pero te desmayas. \n' +
                                'Te despiertas en otro lugar sientiéndote menos segura.'
                            },
                            {
                                text: 'Levantarse',
                                cb: () => {
                                    this.info.player.addFaith(-5);
                                    this.info.player.setDead();
                                }
                            }
                        ]
                    }
                    else {
                        this.content[3].next = [
                            {
                                text: 'Utilizas todas tus fuerzas para seguir despierta. A duras penas, resistes.'
                            },
                            {
                                text: 'Continuar',
                                cb: () => {
                                    this.info.player.setAlive();
                                }
                            }
                        ]
                    }
                }
                
            }
        ]
    }
}

export class testSilueta_0 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'background';
        this.content = [
            {
                text: '1'
            },
            {
                text: 'ok',
                cb: () => { this.completeEvent(0,10)},
            }
        ]
    }
}

export class testSilueta_1 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_1' });
        //array con los elementos de un evento
        this.backgroundImage = 'background';
        this.content = [
            {
                text: '2'
            },
            {
                text: 'ok',
                cb: () => { this.completeEvent(0,10)},
            }
        ]
    }
}

export class testSilueta_2 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_2' });
        //array con los elementos de un evento
        this.backgroundImage = 'background';
        this.content = [
            {
                text: '3'
            },
            {
                text: 'ok',
                cb: () => { this.completeEvent(0,10)},
            }
        ]
    }
}