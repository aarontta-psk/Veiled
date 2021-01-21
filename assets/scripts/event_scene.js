export default class eventScene extends Phaser.Scene {
    init(data) {
        this.info = data;
    }

    layout(options, group) {
        this.scene.bringToTop();
        //variable para separar las opciones en el eje y
        let distancia = 270;
        //antes de mostrar las opciones, borro las anteriores
        group.removeAll(true);

        const mainText = this.add.text(this.cameras.main.width*0.08, 60, options[0].text, {
            fontFamily: 'Neucha',
            wordWrap: {width: this.cameras.main.width*0.65, useAdvancedWrap: true}
        }).setResolution(1.2).setScale(1.3).setAlign('left');
        group.add(mainText);
        //para cada opcion
        for (let i = 1; i < options.length; i++) {
            //console.log(options);
            //añado un texto
            const optionText = this.add.text(this.cameras.main.width*0.08, distancia, options[i].text, {
                fontFamily: 'Neucha',
                color: '#000000',
                wordWrap: {width: this.cameras.main.width*0.72, useAdvancedWrap: true}
            }).setInteractive().setResolution(1.6).setScale(1.6);
            //lo añado al container para borrarlo mas adelante
            group.add(optionText);
            distancia += 70;

            //llamo a un callback en caso de que sea pulsado
            optionText.on('pointerdown', () => {
                this.sound.play('sfxClick');
                if (options[i].condition === undefined || (options[i].condition !== undefined && options[i].condition(this))) {
                    if(options[i].cb !== undefined) options[i].cb();
                    if(options[i].end === undefined){
                        //si el evento continua, se llama de nuevo a la funcion
                        if (options[i].next !== undefined) this.layout(options[i].next, group);
                        //en caso contrario
                        else {
                            this.scene.stop();
                            // this.scene.resume(this.info.prevScene.scene.key);
                            this.scene.wake(this.info.prevScene.scene.key);
                        }
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
        if(faithToAdd !== 0) this.info.player.addFaith(faithToAdd);
        this.info.player.numCompletedEvents++;
        this.completed = true;
        this.sound.play('sfxFaithUp')
    }

    completeMainEvent(sanityToAdd, faithToAdd){
        //si devuelve false, ya no quedan objetivos
        this.info.prevScene.nextObjective();
        this.info.prevScene.silhouette.nextEvent().completed = true;
        this.completeEvent(sanityToAdd, faithToAdd);
    }
}


export class testSilueta_0 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'Como me gustaba este pueblo, con su tranquilidad y su belleza. Todo el mundo vive en paz aqui,' +
                ' haciendo sus cosas sin molestar a nadie. Que pena que estes perdiendo mi memoria ' +
                ' cada dia que pasa. A lo mejor deberias tener un poco más de fe en ti misma. ¡Oh, mira!, en ese' +
                ' banco hay alguien, a lo mejor te interesa hablarle.'
            },
            {
                text: '...Vale',
                cb: () => {
                    this.info.prevScene.gui.silhouetteTooltip.setVisible(false)
                }
            }
        ]
    }
}

export class testSilueta_1 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_1' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: '¡Anda!, se ve que aun puedo hablarte. Se ve que esa conversacion te ha debido ayudar en tu ' +
                'intento por recuperar tu fe. Estoy seguro que más gente en el pueblo te puede ayudar. Puede que tu hermano aun esté ' +
                'por aqui, a lo mejor te viene bien visitarle para recordar los viejos tiempos. Piensa que mientras más te mejores, ' +
                'más conversaciones podré tener contigo'
            },
            {
                text: '...Eso haré',
                cb: () => {
                    this.info.prevScene.gui.silhouetteTooltip.setVisible(false)
                }
            }
        ]
    }
}

export class testSilueta_2 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_2' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'Siempre me arrepentí de no poder decirle todo lo que quería a tu hermano. Los últimos meses ' +
                'estuve constantemente tambaleándome entre nuestra casa y el hospital. Ah, cuanto le debo a ese doctor.' + 
                'Seguro que si le hablas te cuenta algo interesante.'
            },
            {
                text: '...Vale',
                cb: () => {
                    this.info.prevScene.gui.silhouetteTooltip.setVisible(false)
                }
            }
        ]
    }
}

export class testSilueta_3 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_3' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: '!Hey, cuanto tiempo! Siempre agradeceré todo lo que el médico me ayudó en mis peores momentos. Por ' +
                'cierto, el leñador que estaba cerca de nuestra casa siempre ha sido muy excentrico. A lo mejor te cae bien.'
            },
            {
                text: '...Puede ser',
                cb: () => {
                    this.info.prevScene.gui.silhouetteTooltip.setVisible(false)
                }
            }
        ]
    }
}

export class testSilueta_4 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_4' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: '¡Árbol enfermo! Que cosas más raras dice el leñador, pero bueno, viéndome a mi,' +
                ' creo que hay cosas más raras en este mundo. Deberías hacerle el favor a ese buen hombre'
            },
            {
                text: 'Vale, padre',
                cb: () => {
                    this.info.prevScene.gui.silhouetteTooltip.setVisible(false)
                }
            }
        ]
    }
}

export class testSilueta_5 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_5' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'Creo que ya es hora de devolverle lo que nos pidió a nuestro extraño vecino, ¿no crees?'
            },
            {
                text: 'Debería, sí',
                cb: () => {
                    this.info.prevScene.gui.silhouetteTooltip.setVisible(false)
                }
            }
        ]
    }
}

export class testSilueta_6 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_6' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: '¡Con que de ahí sacaba sus mejunjes el doctor! No me extraña que siempre fuesen tan gratificantes. ' +
                'Quizá otra visita para hablar con el te ayudaría a avanzar en tu recuperación.'
            },
            {
                text: 'Podría ser, debería hacerlo',
                cb: () => {
                    this.info.prevScene.gui.silhouetteTooltip.setVisible(false)
                }
            }
        ]
    }
}

export class testSilueta_7 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_7' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'Ah, él. Siempre fue un hombre inteligente y astuto, pero la edad, como puedes observar, no perdona. ' +
                'Ahora él tambien sufre las mismas desgracias que tu padecías. A lo mejor esto te muestra la bendición que ' + 
                'realmente te ha acaecido. Intenta hablar con él para que veas como se siente.'
            },
            {
                text: 'Puede que tengas razón',
                cb: () => {
                    this.info.prevScene.gui.silhouetteTooltip.setVisible(false)
                }
            }
        ]
    }
}

export class testSilueta_8 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_8' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'Ese hombre, siempre fue un cascarrabias. Tiene buen corazón pero se deja llevar mucho por sus emociones.' +
                ' Bueno, no todo el mundo puede ser perfecto. Ve a recuperar lo que te ha pedido el señor.'
            },
            {
                text: 'Voy',
                cb: () => {
                    this.info.prevScene.gui.silhouetteTooltip.setVisible(false)
                }
            }
        ]
    }
}

export class testSilueta_9 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_9' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'Esto demuestra lo muy ruin que puede ser la gente con personas en circunstancias desafortunadas. ' +
                'Que suerte que esto ya no te puede ocurrir a tí, hija mia. Volvamos con el señor.'
            },
            {
                text: 'Voy a ayudarle, sí',
                cb: () => {
                    this.info.prevScene.gui.silhouetteTooltip.setVisible(false)
                }
            }
        ]
    }
}

export class testSilueta_10 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_10' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'Ah, empiezo a sentir como por fin estas dejando atrás las cadenas que te hacen sufrir al usar tus ojos. ' + 
                'El doctor estaría muy orgulloso de tus avances. Quizá una última visita le dejaría muy contento, ' + 
                ' y te enseñaría lo mucho que este pueblo se preocupa por tu salud.'
            },
            {
                text: 'Es verdad, padre, iré a verle.',
                cb: () => {
                    this.info.prevScene.gui.silhouetteTooltip.setVisible(false)
                }
            }
        ]
    }
}

export class testSilueta_11 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_11' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'Bueno, parece ser que mi tiempo aquí está acabando. Que sepas que, como ya te había dicho, te quiero con ' +
                'todo mi corazón, y, pese a que ya no te pueda ver crecer más, me alegro de que por fin puedas disfrutar de manera plena ' +
                'lo que la ceguera te quito. Si vas a hablar con tu abuela, ella tendrá algo que probablemente te haga feliz'
            },
            {
                text: '...Padre ...*sniff* yo también te quiero ...Adiós',
                cb: () => {
                    this.info.prevScene.gui.silhouetteTooltip.setVisible(false)
                }
            }
        ]
    }
}