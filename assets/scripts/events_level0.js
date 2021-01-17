import eventScene from './event_scene.js'

export class dad_Event_0 extends eventScene {
    constructor() {
        super({ key: 'dad_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'Tras duros meses de batalla, intentando acabar con los dolores que su enfermedad le causaba, ' +
                    'ves como tu padre esta tendido en su cama, augurando el momento en el que todo esto acabe.\n' +
                    '-Ay, María, ya me queda poco tiempo en este pueblo que tanto aprecio. Jamas perdonaré a esta enfermedad ' +
                    'por privarme de poder verte más. Te pido un ultimo favor antes de irme, ¿podrias traerme la foto que está al lado de la mesa?',
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
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'María, me duele cada vez mas la cabeza, ¿me has traido ya la foto que te pedí?',
            },
            {
                text: 'Claro, padre',
                failedText: 'No tienes aun la foto',
                condition: function (ref) {
                    return (ref.info.player.inventory.contains('Foto'));
                },
                cb: () => {
                    this.info.player.inventory.removeObjectByKey('Foto');
                    this.info.player.inventory.collect('Colgante');
                    this.completeEvent(0, 0);
                },
                next: [
                    {
                        text: 'Oh, que recuerdos me da esta foto. Que bonitos dias pase con todos vosotros en aquel viaje a '
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
                        text: 'Por favor, apresurate, que no se cuanto aguantaré con este dolor.'
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
                    if (!this.info.player.inventory.contains('Colgante') && !this.info.blindfold.blind) {
                        this.content[3].next = [
                            {
                                text: 'María, mi ultimo deseo es verte en tu máximo esplendor.'
                                    + ' Por favor, ponte el colgante y dejame ver tus ojos por ultima vez'
                            },
                            {
                                text: 'Vale, padre'
                            }
                        ]
                    }
                    else {
                        this.content[3].next = [
                            {
                                text: '¿Ah! Que suerte que heredaste la belleza de tu madre. Que alegría poder ver esos ojos '
                                    + 'por última vez. Como deseo que puedas observar las maravillas de este mundo ahora que puedes'
                                    + ' verlas por primera vez.\nCreo que ya ha llegado mi hora. María, quiero que sepas que siempre os he querido'
                                    + ' tanto a ti como a toda la familia con todas mis fuerzas. Espero que tenga una gran vida por delante.',
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
                                        mainText: 'Apesadumbrada, te aferra a la venda que nunca te enseño '
                                            + 'los horrores del mundo fisico, pero las últimas palabras de tu padre quedan grabadas en tu mente, '
                                            + 'influenciando tus pensamientos e ideales.'
                                    })
                                },
                                end: true
                            }
                        ]
                    }
                }
            }
        ]
    }
}