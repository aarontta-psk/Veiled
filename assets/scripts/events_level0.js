import eventScene from './event_scene.js'
import { PendantItem } from './item.js' //dad_event_1

export class dad_Event_0 extends eventScene {
    constructor() {
        super({ key: 'dad_Event_0' });
        this.backgroundImage = 'eventMenu';
        //contenido del evento
        this.content = [
            {
                text: 'Tras duros meses de batalla, intentando acabar con los dolores que su enfermedad le causaba, ' +
                    'ves como tu padre esta tendido en su cama, augurando el momento en el que todo esto acabe.\n' +
                    '-Ay, María, ya me queda poco tiempo en este pueblo que tanto aprecio. Jamás perdonaré a esta enfermedad ' +
                    'por privarme de poder verte más. Te pido un áltimo favor antes de irme, ¿podráas traerme la foto que está al lado de la mesa?',
            },
            {
                text: 'Por supuesto, padre',
                cb: () => { this.completeEvent(0, 0) }
            }
        ]
    }
}

export class dad_Event_1 extends eventScene {
    constructor() {
        super({ key: 'dad_Event_1' });
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'María, me duele cada vez más la cabeza, ¿me has traído ya la foto que te pedí?',
            },
            {
                text: 'Claro, padre',
                //texto que se imprime si no se cumple la condicion
                failedText: 'No tienes aun la foto',
                //condicion que se tiene que cumplir para continuar el evento
                condition: function (ref) {
                    return (ref.info.player.inventory.contains('Foto'));
                },
                //callback que se ejecuta al cumplirse la condicion
                cb: () => {
                    this.info.player.inventory.removeObjectByKey('Foto'); //se elimina un item
                    this.info.prevScene.insertItem(new PendantItem(this.info.prevScene.matter.world, //se inserta otro item
                        0, 0, this.info.prevScene.itemFrames[13], this.info.player));
                    this.completeEvent(0, 20); //se completa el evento
                },
                next: [
                    {
                        text: 'Oh, que recuerdos me da esta foto. Que bonitos días pase con todos vosotros en aquel viaje a '
                            + 'la ciudad. Que divertidas fueron las tardes, las fiestas y los paseos.\n'
                            + 'En fin, quería darte éste colgante que me dejó tu madre antes de morir por esta misma enfermedad'
                            + ' que estoy sufriendo. Póntelo y vuelve a ver como te queda. Ah, y,'
                            + ' por favor, quitate la venda, que quiero ver tus bonitos ojos por ultima vez.'
                    },
                    {
                        text: 'Muchas gracias, padre'
                    }
                ]
            },
            {
                text: 'Aun no, padre',
                next: [
                    {
                        text: 'Por favor, apresúrate, que no se cuanto aguantaré con este dolor.'
                    },
                    {
                        text: 'Vale, padre'
                    }
                ]
            }
        ]
    }
}

export class dad_Event_2 extends eventScene {
    constructor() {
        super({ key: 'dad_Event_2' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: "María, ¿has hecho lo que te pedí?"
            },
            {
                text: "Claro, padre",
                cb: () => {
                    if (this.info.player.inventory.contains('Colgante') || this.info.blindfold.blind) {
                        this.content[1].next = [
                            {
                                text: 'María, mi ultimo deseo es verte en tu máximo esplendor.'
                                    + ' Por favor, ponte el colgante y dejame ver tus ojos por última vez.'
                            },
                            {
                                text: 'Vale, padre'
                            }
                        ]
                    }
                    else {
                        this.content[1].next = [
                            {
                                text: '¡Ah! Que suerte que heredaste la belleza de tu madre. Que alegría poder ver esos ojos '
                                    + 'por última vez. Cómo deseo que puedas observar las maravillas de este mundo ahora que puedes'
                                    + ' verlas por primera vez.\nCreo que ya ha llegado mi hora. María, quiero que sepas que siempre os he querido'
                                    + ' tanto a ti como a toda la familia con todas mis fuerzas. Espero que tengas una gran vida por delante.',
                            },
                            {
                                text: '...Padre',
                                cb: () => {
                                    this.completeEvent(0, 100);
                                    //este evento no cuenta para el numero de eventos completados
                                    this.info.player.numCompletedEvents--;
                                    this.scene.stop();
                                    this.scene.run('infoLevel', {
                                        obtainedFaith: this.info.player.faith, numEvents: this.info.player.numCompletedEvents, nextLevel: 'level1',
                                        totalLevelEvents: this.info.prevScene.totalLevelEvents,
                                        mainText: 'Apesadumbrada, te aferra a la venda que nunca te enseño '
                                            + 'los horrores\ndel mundo físico, pero las últimas palabras de tu padre quedan grabadas\nen tu mente, '
                                            + 'influenciando tus pensamientos e ideales.'
                                    })
                                },
                                end: true //propiedad que indica que se termina el nivel
                            }
                        ]
                    }
                }
            }
        ]
    }
}