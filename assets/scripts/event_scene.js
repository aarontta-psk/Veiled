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
        this.completeEvent(sanityToAdd, faithToAdd);
        this.info.prevScene.nextObjective();
        this.info.prevScene.silhouette.nextEvent().completed = true;
    }
}

export class testSilueta_0 extends eventScene{
    constructor() {
        super({ key: 'testSilueta_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'ir a elder'
            },
            {
                text: 'ok',
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
                text: 'ir a brother'
            },
            {
                text: 'ok',
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
                text: 'ir a medico'
            },
            {
                text: 'ok',
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
                text: 'ir a leñador'
            },
            {
                text: 'ok',
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
                text: 'ir a arbol'
            },
            {
                text: 'ok',
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
                text: 'ir a medico, llevarle medicina'
            },
            {
                text: 'ok',
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
                text: 'ir a vagabundo'
            },
            {
                text: 'ok',
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
                text: 'ir a tabernero'
            },
            {
                text: 'ok',
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
                text: 'coger el baston'
            },
            {
                text: 'ok',
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
                text: 'volver con el vagabundo'
            },
            {
                text: 'ok',
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
                text: 'ir a medico una ultima vez'
            },
            {
                text: 'ok',
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
                text: 'ir a grandMother'
            },
            {
                text: 'ok',
                cb: () => {
                    this.info.prevScene.gui.silhouetteTooltip.setVisible(false)
                }
            }
        ]
    }
}

// export class testSilueta_2 extends eventScene{
//     constructor() {
//         super({ key: 'testSilueta_2' });
//         //array con los elementos de un evento
//         this.backgroundImage = 'eventMenu';
//         this.content = [
//             {
//                 text: '3'
//             },
//             {
//                 condition: function (ref) {
//                     return ref.info.player.faith > 25;
//                 },
//                 failedText: 'Aun no tienes la fe necesaria',
//                 text: 'Completar este nivel al tener la fe necesaria',
//                 cb: () => {
//                     this.completeEvent(0,10);
//                 },
//             },
//             {
//                 text: 'Seguir explorando',
//                 cb: () => {}
//             }
//         ]
//     }
// }