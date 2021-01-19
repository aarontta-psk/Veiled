import eventScene from './event_scene.js'
import {
    CaneItem, /*cane_event_0*/ GlassesItem, /*glassesItem_Event_0*/ EmptyBucketItem, /*tavern_Event_0*/
    BucketItem, /*well_event_0*/ StampItem, LessDeathItem, BetterBlindFoldItem, /*seller_event_0*/
    FlowerItem, /*hungryKid_Event_0*/ MoneyBagItem, /*foreigner_Event_1, coins_Event_0, grave_Event_0*/
    SickTreeItem, /*sickTreeEvent*/ KaleidoscopeItem, SketchItem /*painterEvent_0*/
} from './item.js'

//#region SecondaryEvents
export class elder_Event_0 extends eventScene {
    constructor() {
        super({ key: 'elder_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: 'Reposando en un banco se encuentra alguien. Está callado. No te habrías dado cuenta de que está ahí de\n' +
                    'no ser porque tose muy fuerte. Se nota que su salud no es muy buena'
            },
            {
                text: '¿Se encuentra bien?',
                next: [
                    {
                        text: '-Claramente no. ¿No lo ves? Claro que no lo ves. En fin, se te nota perdida por aqui. ¿Hace tiempo\n' +
                            'que no caminas por el pueblo? Te puedo contar como va todo por aqui, pero antes acercame mi botella,\n' +
                            '¿quieres? Esta justo aqui al lado, pero no quiero levantarme'
                    },
                    {
                        text: 'Darle la botella',
                        condition: function (ref) {
                            return (ref.info.player.inventory.contains('Botella'))
                        },
                        failedText: 'Aún no has cogido la botella',
                        next: [
                            {
                                text: '-¡Asi me gusta! Nada mejor que un trago para despejarse por la mañana *Hip*'
                            },
                            {
                                text: '...Preocupada, te sientes tentada a preguntarle algunas cosas',
                                cb: () => {
                                    this.info.player.inventory.removeObjectByKey('Botella');
                                    this.completeMainEvent(30, 30);

                                },
                            }

                        ]
                    },
                    {
                        text: 'Ir a buscar la botella'
                    }
                ]
            },
            {
                text: 'Seguir caminando'
            }
        ]
    }
}

export class elder_Event_1 extends eventScene {
    constructor() {
        super({ key: 'elder_Event_1' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: '-Bueno, bueno... El pueblo tampoco ha cambiado demasiado, pero nunca viene mal recordar. ¿Qué quieres saber?',
            },
            {
                text: '¿Qué hay en la plaza?',
                next: [
                    {
                        text: '-Bueno, ya sabes, es donde vive la gente y donde hacen principalmente su vida. Tenemos un mercado sencillo \n' +
                            'y una posada, aunque está cerrada. Ah, y un pozo del que sacamos agua.'
                    },
                    {
                        text: 'Gracias por la información'
                    }
                ]
            },
            {
                text: '¿Qué hay al noroeste?',
                next: [
                    {
                        text: '-Allí no encontrarás mucho. Es una zona apartada que da al bosque en la que solo habita el leñador. Hace días\n' +
                            'que no pasa por la plaza. ¿Podrías ir a verlo por mi? Es un viejo amigo mio, aunque ya no puedo ir a verle a\n' +
                            'menudo. Estoy un poco preocupado por él'
                    },
                    {
                        text: 'Lo tendré en cuenta'
                    }
                ]
            },
            {
                text: '¿Qué hay al noreste?',
                next: [
                    {
                        text: '-Puedes encontrar al doctor allí. Suele estar ocupado, pero es una buena persona. Ayuda a la gente, tal\n' +
                            'vez quieras visitarlo. Si vas de camino encontrarás el cementerio. Ya lo sé, bastante preocupante que\n' +
                            'ambos sitios estén tan cerca. Pero bueno, tal vez quieras presentarle tus respetos a alguien'
                    },
                    {
                        text: 'Si...Gracias'
                    }
                ]
            },
            {
                text: '¿Qué hay al sureste?',
                next: [
                    {
                        text: '-Solo sé que es dónde vive una pintora bastante reconocida. No se mucho de ella, solo que es muy buena en lo\n'
                            + 'suyo. Si te interesa, puedes ir a verla, pero no te puedo decir más'
                    },
                    {
                        text: 'Vale, gracias.'
                    }
                ]
            }
        ]
    }
}

export class hungryKid_Event_0 extends eventScene {
    constructor() {
        super({ key: 'hungryKid_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: 'Escuchas cerca a un niño caminando por el campo. Al centrarte en él, te das cuenta de que\n' +
                    'está buscando flores. Al acercarte se fija en ti y se acerca corriendo\n' +
                    '-Hola, ¿sería usted tan amable de darme algo de comer *Cof *Cof?'

            },
            {
                text: 'No tengo nada, lo siento',
                next: [
                    {
                        text: 'El niño, al ver que no puedes hacer nada por él, decide seguir buscando flores\n' +
                            '-Que pena, hace tiempo que no me llevo nada a la boca',
                    },
                    {
                        text: 'Sintiéndote un poco mal por él, te alejas',
                        cb: () => {
                            this.info.player.addSanity(-5);
                        }
                    }
                ]
            },
            {
                text: 'Toma, esto te sentará bien',
                condition: function (ref) {
                    return (ref.info.player.inventory.contains('Comida'))
                },
                failedText: 'No tienes comida que ofrecerle',
                next: [
                    {
                        text: 'El niño se lleva corriendo la comida a la boca. Parece que no haya comido en días.\n' +
                            '-Creo que me encuentro mejor ¡Gracias! Aunque no tengo dinero para pagarla... Pero tengo' +
                            ' estas flores si las quieres'
                    },
                    {
                        text: 'Aceptar su regalo',
                        cb: () => {
                            this.info.player.inventory.removeObjectByKey('Comida');
                            this.info.prevScene.insertItem(new FlowerItem(this.info.prevScene.matter.world,
                                0, 0, this.info.prevScene.itemFrames[6], this.info.player));
                            this.completeEvent(15, 10)
                        }
                    }
                ]

            }
        ]
    }
}

export class grandMother_Event_0 extends eventScene {
    constructor() {
        super({ key: 'grandMother_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: '-¡María! Dichosos mis ojos, ¿hace cuanto que has vuelto? Deberías haber avisado.\n' +
                    'Es importante contar con la familia en estos momentos de adversidad.'
            },
            {
                text: 'Perdona, pero la muerte de padre...',
                next: [
                    {
                        text: 'Ah si. Tu padre. Fue un gran hombre. Nunca te he hablado demasiado de cuando él\n' +
                            'era tan solo un mozo. ¿Quieres que lo cuente?'
                    },
                    {
                        text: 'Prefiero no ahondar en el pasado',
                    },
                    {
                        text: 'Me encantaría, le echo mucho de menos',
                        next: [
                            {
                                text: 'PONER HISTORIA, RESTAR CORDURA POR CADA TEXTO NEXT[] QUE TE CUENTA Y DAR FE AL FINAL'
                            },
                            {
                                text: 'Acabar',
                                cb: () => {
                                    this.completeMainEvent(1, 1);
                                }
                            }
                        ]
                    },
                ]
            },
            {
                text: 'Necesito un tiempo',
                next: [
                    {
                        text: 'Bueno, te estaré esperando aquí, cuando te sientas lista ven a verme'
                    },
                    {
                        text: 'Asentir e irse'
                    }
                ]
            }
        ]
    }
}

export class seller_Event_0 extends eventScene {
    constructor() {
        super({ key: 'seller_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: '-!Buenos dias! Tengo disponibles numerosos artículos disponibles en mi tienda. Seguro que\n' +
                    'tengo algo que te pueda ser de utilidad. Pero solo podremos hacer un trato si tienes algo con lo\n' +
                    'que pagar.'
            },
            {
                text: 'Mostrarle dinero',
                failedText: 'No tienes con qué pagar',
                condition: function (ref) {
                    return (ref.info.player.inventory.contains('Bolsa con monedas'));
                },
                next: [
                    {
                        text: '-Oh, eso es otra cosa. Estaré encantado de hacer negocios contigo'

                    },
                    {
                        text: 'Con curiosidad, te sientes tentada a investigar la tienda',
                        cb: () => {
                            this.completeEvent(15, 15);
                        }
                    }
                ]
            },
            {
                text: 'No tengo nada de valor',
                next: [
                    {
                        text: '-Que lástima. Lo siento, pero yo también tengo que ganarme la vida, ¿sabes?'
                    },
                    {
                        text: 'Irse de la tienda'
                    }
                ]
            }
        ]
    }
}

export class seller_Event_1 extends eventScene {
    constructor() {
        super({ key: 'seller_Event_1' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: 'Echale un vistazo... Bueno, mejor te cuento que te puede ser de utilidad\n' +
                    'Por esa cantidad de dinero puedo ofrecerte:'
            },
            {
                text: 'Venda de tela resistente',
                next: [
                    {
                        text: '-¿Pero que haces con esos harapos? Te vendrá mucho mejor una venda de verdad,\n' +
                            'que se sujete bien y este hecha con telas resistentes.-\n' +
                            'Te ofrece la venda para que la pruebes con el tacto. Tiene razón, es de buena calidad.\n' +
                            '(Aumenta la cordura máxima que se puede recuperar)'
                    },
                    {
                        text: 'Comprar la venda',
                        failedText: 'No tienes dinero',
                        condition: function (ref) {
                            return (ref.info.player.inventory.contains('Bolsa con monedas'));
                        },
                        cb: () => {
                            this.info.player.inventory.removeObjectByKey('Bolsa con monedas');
                            this.info.prevScene.insertItem(new BetterBlindFoldItem(this.info.prevScene.matter.world,
                                0, 0, this.info.prevScene.itemFrames[3], this.info.player));
                        }
                    },
                    {
                        text: 'Esto no me interesa, gracias'
                    }
                ]
            },
            {
                text: 'Laúdano',
                next: [
                    {
                        text: '-Te noto cansada. Esta medicina puede ayudarte a sentirte mejor, te recomiendo que la pruebes.\n' +
                            '(Disminuye la probabilidad de desmayarte al perder la cordura)'
                    },
                    {
                        text: 'Comprar la medicina',
                        failedText: 'No tienes dinero',
                        condition: function (ref) {
                            return (ref.info.player.inventory.contains('Bolsa con monedas'));
                        },
                        cb: () => {
                            this.info.player.inventory.removeObjectByKey('Bolsa con monedas');
                            this.info.prevScene.insertItem(new LessDeathItem(this.info.prevScene.matter.world,
                                0, 0, this.info.prevScene.itemFrames[11], this.info.player));
                        }
                    },
                    {
                        text: 'Esto no me interesa, gracias'
                    }
                ]
            },
            {
                text: 'Estampita',
                next: [
                    {
                        text: '- En los tiempos que corren es importante tener fe. Esta estampita es muy especial. Es de\n' +
                            'nada mas y nada menos que nuestro creador Unamu... ¿Quién? Quería decir Dios\n' +
                            '(Aumenta algo la fe)'
                    },
                    {
                        text: 'Comprar la estampita',
                        failedText: 'No tienes dinero',
                        condition: function (ref) {
                            return (ref.info.player.inventory.contains('Bolsa con monedas'));
                        },
                        cb: () => {
                            this.info.player.inventory.removeObjectByKey('Bolsa con monedas');
                            this.info.prevScene.insertItem(new StampItem(this.info.prevScene.matter.world,
                                0, 0, this.info.prevScene.itemFrames[21], this.info.player));
                        }
                    },
                    {
                        text: 'Esto no me interesa, gracias'
                    }
                ]
            },
            {
                text: 'De momento no quiero nada'
            }
        ]
    }
}

export class grave_Event_0 extends eventScene {
    constructor() {
        super({ key: 'grave_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: 'Te acercas al cementerio donde recuerdas que está la tumba de tu padre. El recuerdo de su muerte\n' +
                    'es reciente y no es nada agradable.'
            },
            {
                text: 'Observar la tumba',
                next: [
                    {
                        text: 'Te quitas la venda brevemente. Por un momento sientes una gran tristeza al ver su tumba, e\n' +
                            'inmediatamente te vuelves a poner la venda. Te ha dado tiempo a ver que la tumba no está en muy buen\n' +
                            'estado. Hay hierbajos y unas flores marchitas como ofrenda. Da pena ver lo mal cuidadas que están'
                    },
                    {
                        text: 'Reincorporarse e irse',
                        cb: () => {
                            this.info.player.addSanity(-15);
                        }
                    }
                ]
            },
            {
                text: 'Observar el cementerio',
                next: [
                    {
                        text: 'Te quitas la venda brevemente. Todas las tumbas están algo descuidadas. Es una imagen triste que\n' +
                            'se te va a quedar grabada'
                    },
                    {
                        text: 'Irse',
                        cb: () => {
                            this.info.player.addSanity(-10);
                        }
                    }
                ]
            },
            {
                text: 'Hacer una ofrenda',
                failedText: 'No tienes flores que colocar',
                condition: function (ref) {
                    return (ref.info.player.inventory.contains('Flor'));
                },
                next: [
                    {
                        text: 'Colocas las flores que te dio el niño como ofrenda. Eran las favoritas de tu padre\n' +
                            'Recordarlo te alivia y te hace sentir mejor. Tambien arrancas algunos hierbajos para\n' +
                            'dejar el lugar cuidado. Al hacerlo ves una bolsa con algunas monedas.'
                    },
                    {
                        text: 'Coger las monedas',
                        cb: () => {
                            this.info.player.inventory.removeObjectByKey('Flor');
                            this.info.prevScene.insertItem(new MoneyBagItem(this.info.prevScene.matter.world,
                                0, 0, this.info.prevScene.itemFrames[12], this.info.player));
                            this.completeEvent(-10, 5);
                        }
                    }
                ]
            },
            {
                text: 'Abandonar el cementerio'
            }
        ]
    }
}

export class coins_Event_0 extends eventScene {
    constructor() {
        super({ key: 'coins_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: 'Escuchabas un ruido extraño y decidiste comprobar que era. Resulta que eran una bolsa de monedas' +
                    'Podría serte útil'
            },
            {
                text: 'Coger la bolsa de monedas',
                cb: () => [
                    this.info.prevScene.insertItem(new MoneyBagItem(this.info.prevScene.matter.world,
                        0, 0, this.info.prevScene.itemFrames[12], this.info.player))
                ]
            },
            {
                text: 'Dejar la bolsa allí'
            }
        ]
    }
}

export class well_Event_0 extends eventScene {
    constructor() {
        super({ key: 'well_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: 'Te acercas a donde se supone que estaba el pozo, en el centro del poblado. Con el tacto\n' +
                    'te orientas y confirmas que efectivamente estas en el sitio indicado'
            },
            {
                text: 'Sacar algo de agua',
                failedText: 'No tienes un cubo',
                condition: function (ref) {
                    return (ref.info.player.inventory.contains('Cubo vacio'));
                },
                cb: () => {
                    this.info.player.inventory.removeObjectByKey('Cubo vacio');
                    this.info.prevScene.insertItem(new BucketItem(this.info.prevScene.matter.world,
                        0, 0, this.info.prevScene.itemFrames[22], this.info.player));
                    this.completeEvent(0, 0);
                }
            },
            {
                text: 'Alejarse con cuidado'
            }
        ]
    }
}

export class foreigner_Event_0 extends eventScene {
    constructor() {
        super({ key: 'foreigner_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: 'Te acercas a alguien muy ruidoso. Habla bastante alto y se nota que no es de por aquí. Tiene un acento extraño que ' +
                    'no sabes muy bien de dónde es. -Hey, la de la venda. Tengo un problema. La posada está cerrada. ¡Necesito un lugar ' +
                    'para dormir! ¿Puedes hacer algo? Llamando a la puerta no me hacen ni caso'
            },
            {
                text: '¿Por que yo?',
                next: [
                    {
                        text: '-Nadie mas me ayuda. En este pueblo sois muy antipáticos. Mira, si me ayudas te daré unas monedas. Encontrarás la ' +
                            'posada al suroeste de la plaza'
                    },
                    {
                        text: '*Suspirar* Bueno, pasaré por la posada',
                        cb: () => {
                            this.completeEvent(10, 10);
                        }
                    },
                    {
                        text: 'No tengo tiempo ahora'
                    }
                ]
            }
        ]
    }
}

export class foreigner_Event_1 extends eventScene {
    constructor() {
        super({ key: 'foreigner_Event_1' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';

        this.content = [
            {
                text: '-¿Lo has conseguido?',
            },
            {
                text: 'En teoria si',
                failedText: 'La posada no está abierta',
                condition: function (ref) {
                    return (ref.scene.get('glasses_Event_2').completed);
                },
                next: [
                    {
                        text: '-¡Sabía que podía contar contigo! Bueno, lo prometido es deuda.-\n' +
                            'Te entrega una bolsa con algunas monedas'
                    },
                    {
                        text: 'No hay de qué',
                        cb: () => {
                            this.info.prevScene.insertItem(new MoneyBagItem(this.info.prevScene.matter.world,
                                0, 0, this.info.prevScene.itemFrames[12], this.info.player));
                            this.completeEvent(0, 0);
                        }
                    }
                ]
            },
            {
                text: 'Aún no'
            }
        ]
    }
}

export class tavern_Event_0 extends eventScene {
    constructor() {
        super({ key: 'tavern_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: 'Tras un rato buscando encuntras la posada de la que te ha hablado el extranjero. ' +
                    'Está cerrada, como ya te ha dicho'
            },
            {
                text: 'Llamar a la puerta',
                next: [
                    {
                        text: 'Aporreas la puerta 3 veces. Al rato vuelves a hacerlo. No hay respuesta'
                    },
                    {
                        text: 'Irse'
                    }
                ]
            },
            {
                text: 'Llamar a la ventana',
                next: [
                    {
                        text: 'Dando pequeños golpes a la ventana, escuchas como alguien se levanta y la abre.' +
                            'Una mujer somnolienta te habla -*Bostezo* ¿Si? ¿Que ocurre?'
                    },
                    {
                        text: '¿Está la posada abierta?',
                        next: [
                            {
                                text: 'En lo que le preguntabas...Se ha vuelto a quedar dormida'
                            },
                            {
                                text: '*Suspiro* Tendre que llamar otra vez'
                            }
                        ]
                    },
                    {
                        text: '¿Por qué me has ignorado?',
                        next: [
                            {
                                text: '-¿Qué? Creo que me he quedado dormido. Normalmente es Miguel quien se encarga de recibir ' +
                                    'a los clientes. Salió hace rato. Si quieres algo tendrás que hablar con él'
                            },
                            {
                                text: 'Ire a buscarle pues',
                                next: [
                                    {
                                        text: '-Espera un segundo. Miguel se pasa el dia en las nubes. No te hara caso así como así. ' +
                                            'Toma esto-Te ofrece un cubo de madera vacío -Llena este cubo con agua. Ya lo entenderás cuando lo ' +
                                            'veas.'
                                    },
                                    {
                                        text: 'Coger el cubo y marcharse',
                                        cb: () => {
                                            this.info.prevScene.insertItem(new EmptyBucketItem(this.info.prevScene.matter.world,
                                                0, 0, this.info.prevScene.itemFrames[5], this.info.player));
                                            this.completeEvent(10, 10);
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Preguntar en alto si hay alguien ahí',
                next: [
                    {
                        text: 'Alzas la voz y preguntas -¿Hola? ¿Hay alguien?- No obtienes respuesta'
                    },
                    {
                        text: 'Irse'
                    }
                ]
            }
        ]
    }
}

//activar trigger en el evento anterior
export class glassesItem_Event_0 extends eventScene {
    constructor() {
        super({ key: 'glassesItem_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: 'Siguiendo la orilla del río te percatas de unas gafas que se encuentran ocultas en la hierba. ' +
                    'Huelen igual que la colonia del señor del río'
            },
            {
                text: 'Coger las gafas',
                cb: () => {
                    this.info.prevScene.insertItem(new GlassesItem(this.info.prevScene.matter.world,
                        0, 0, this.info.prevScene.itemFrames[8], this.info.player));
                    this.completeEvent(0, 0);
                }
            },
            {
                text: 'No coger las gafas'
            }
        ]
    }
}

export class glasses_Event_0 extends eventScene {
    constructor() {
        super({ key: 'glasses_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: 'En la orilla del rio se encuentra alguien. Por algún motivo huele mucho a colonia. No te presta ' +
                    'atención, está demasiado concentrado en algo.'
            },
            {
                text: '¿Te ocurre algo?',
                next: [
                    {
                        text: 'No responde, esta demasiado centrado en lo suyo'
                    },
                    {
                        text: 'Irse'
                    }
                ]
            },
            {
                text: 'Llamar su atención',
                failedText: 'No tienes un cubo con agua',
                condition: function (ref) {
                    return (ref.info.player.inventory.contains('Cubo con agua'));
                },
                cb: () => {
                    this.info.player.inventory.removeObjectByKey('Cubo con agua');
                },
                next: [
                    {
                        text: '¿Pero qué... se puede saber qué haces? Si querías algo de mí podrías habermelo dicho',
                    },
                    {
                        text: '...Parece que ahora si escuchas',
                        cb: () => {
                            this.completeEvent(10, 10);
                        }
                    }
                ]
            }
        ]
    }
}

export class glasses_Event_1 extends eventScene {
    constructor() {
        super({ key: 'glasses_Event_1' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: '¿A qué ha venido eso de tirarme un cubo de agua?'
            },
            {
                text: 'Eso es de parte de alguien de la posada',
                next: [
                    {
                        text: '...Maldita. En cuanto vuelva me las va a pagar. Habría vuelto hace rato, pero ' +
                            'he perdido mis gafas. Sin ellas no puedo trabajar. Llevo horas buscando pero no aparecen.'
                    },
                    {
                        text: 'Puedo ayudarte a buscarlas',
                        next: [
                            {
                                text: 'Eso sería muy amable por tu parte. Tienen que estar en la ribera del río. ' +
                                    'Cuando paseo no me gusta llevarlas puestas, es probable que se me cayeran.'
                            },
                            {
                                text: 'Voy a buscarlas',
                                cb: () => {
                                    this.completeEvent(15, 15);
                                }
                            }
                        ]
                    }
                ]
            },
            {
                text: 'No me estabas escuchando',
                next: [
                    {
                        text: '-Si solo vienes a molestar ya puedes irte, estoy bastante ocupado y ahora además empapado.- ' +
                            'Te das cuenta de que no le ha sentado nada bien, te hace sentir un poco mal'
                    },
                    {
                        text: 'Irse',
                        cb: () => {
                            this.info.player.addSanity(-5);
                        }
                    }
                ]
            }
        ]
    }
}

export class glasses_Event_2 extends eventScene {
    constructor() {
        super({ key: 'glasses_Event_2' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: '¿Encontraste las gafas?'
            },
            {
                text: 'Mostrarle las gafas',
                failedText: 'Aun no has encontrado las gafas',
                condition: function (ref) {
                    return (ref.info.player.inventory.contains('Gafas'))
                },
                cb: () => {
                    this.info.player.inventory.removeObjectByKey('Gafas');
                    this.completeEvent(10, 10);
                },
                next: [
                    {
                        text: '-¡Estupendo! Ya puedo volver a trabajar. La posada abrirá de noche',
                    },
                    {
                        text: 'Gracias'
                    }
                ]
            },
            {
                text: 'Aún no, sigo buscando'
            }
        ]
    }
}
//#endregion



//#region MainEvents

export class brother_Event_Idle extends eventScene {
    constructor(npcName) {
        super({ key: 'brother_Event_Idle' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'Encuentras a tu hermano, sientes que no es el momento de hablar con él.'
            },
            {
                text: 'Volver más tarde'
            }
        ]
    }
}

export class brother_Event_0 extends eventScene {
    constructor() {
        super({ key: 'brother_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';

        this.event4 = [
            {
                text: '-Pedro parece encantado. -Genial. Gracias, te aseguro que no lo arrepentirás.- Tornas para irte, pero te interrumpe otra vez -Espera, si vas a ver al doctor, ¿podrías pedirle si puede prepararme otra tarro de medicina para las migrañas? Casi no me queda.'
            },
            {
                text: '¿Con quién hablar?',

                cb: () => { },
                next: [
                    {
                        text: 'Aceptar y seguir en busca del doctor.',
                        cb: () => {
                            this.completeEvent(10, 10);
                            this.info.player.scene.npcs.doctorNpc.setActive(true);
                            this.info.player.scene.nextObjective();
                        }
                    }
                ]
            }
        ];
        this.event3 = [
            {
                text: '-Solo quiero ayudarte. Quiero que seas feliz. Pero llevas una semana sin salir de esa casa, ya no soy el único que se preocupa por ti. Si no puedo convencerte, al menos puedo pedirte, por favor, que hables con alguien más sobre esto. No te encierres con tus penas.'
            },
            {
                text: '¿Con quién hablar?',

                cb: () => { },
                next: [
                    {
                        text: 'Puedes sentir su alivio cuando le preguntas. -¿El doctor Abel, quizá? Siempre fue bueno contigo. Todavía vive donde siempre, arriba del cementerio.\n',
                    },
                    {
                        text: 'Continuar',
                        cb: () => { },
                        next: this.event4
                    }
                ]
            },
            {
                text: 'Darle razón.',
                cb: () => { },
                next: [
                    {
                        text: 'Sientes el alivio de tu hermano al oír tus palabras: -Vale. Concedo. Hablaré con el doctor Abel. Siempre fue empático conmigo. \n¿Aún vive al lado del cementerio?- Pedro afirma -Pues ahí voy.',
                        cb: () => { },
                        next: this.event4
                    }
                ]
            }
        ];
        this.event2 = [
            {
                text: 'Tu hermano no cede: -Él habría querido que vieses de nuevo.'
            },
            {
                text: 'Para.',
                cb: () => { },
                next: [
                    {
                        text: '-Para. No quiero. Me niego',
                        cb: () => { },
                        next: this.event3
                    }
                ]
            },
            {
                text: 'Habría querido que fuese feliz.',
                cb: () => { },
                next: this.event3
            }
        ];
        this.event1 = [
            {
                text: '¡Pues es una señal de la caridad de Dios! Nuestro padre estaba muriendo mucho antes de tu recuperación. Este milagro te permitió verle una última vez antes de que lo perdiésemos.\n¿Dime, al menos has intentado quitarte otra vez la venda?'
            },
            {
                text: 'No desde entonces.',
                cb: () => { },
                next: this.event2
            }
        ];
        this.content = [
            {
                text: 'Al salir de la casa, tu hermano te espera. -Por fin saliste. Mira, sé que esto ha sido difícil para ti. Para mí también. Pero ya sabíamos de hace tiempo que venía. No pudo haberte sorprendido.\n'
            },
            {
                text: 'Me sorprendió su aspecto.',
                next: [
                    {
                        text: 'Explicas: -Verle así, después de tanto tiempo... Tú pudiste ver su deterioro. Para mí, lo repentino fue verle así, como si de primera vez se tratase. \nNo he visto nada desde que fui una niña, y recupero mi visión justo a tiempo para ver morir a mi padre. ¡Si eso no es una señal, no sé qué lo es!',
                        cb: () => { },
                        next: this.event1
                    }
                ]
            },
            {
                text: 'No me sorprendió. Pero llegó en muy mal momento.',
                cb: () => { },
                next: [
                    {
                        text: 'Explicas: -No me sorprendió. Pero fue casi lo primero que había visto en casi veinte años. Odio eso. Odio poder ver. Toda mi vida encontré paz en las tinieblas. Eran mi mundo. Aún lo son. Y de la nada recupero la vista, pero solo para ver morir a mi padre. ¿Qué clase de portento es ese?',
                        cb: () => { },
                        next: this.event1
                    }
                ]
            }
        ];
    }
}

export class doctorEvent_0 extends eventScene {
    constructor() {
        super({ key: 'doctorEvent_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.adviceAccepted = [
            {
                text: '-¿Ves? -responde el doctor- Realmente no necesitabas que te dijera yo esto, me imagino que habrías ' +
                    'llegado a la misma conclusión tú sola. Y si tú prefieres mantenerte para siempre en las tinieblas, ' +
                    'estoy seguro de que volveras a ser tan feliz como siempre fuiste. Pero te urgiría, aunque sea muy ' +
                    'poco a poco, a que al menos probases quitártela, por unos momentos a la vez, y te permitas aprender ' +
                    'a valorar la belleza del mundo visual. Y si te disgusta o te decepciona, siempre podrás ponerte la ' +
                    'venda y volver a la oscuridad.'
            },
            {
                text: 'Asentir y despedirte del viejo doctor',
                cb: () => {
                    //this.info.player.enableBlindfold();
                    this.completeEvent(30, 20);
                }
            }
        ];
        this.advice = [
            {
                text: 'El anciano se queda pensativo un tiempo antes de ofrecerte su consejo: \n\n' +
                    '-¿Y tú rechazas este milagro? Entendible. Me imagino que muchos harían lo mismo, o peor. ' +
                    'Pero te veo ahora con esta venda, y no puedo dejar de pensar que realmente no has perdido nada.'
            },
            {
                text: 'Aceptar consejo',
                next: this.adviceAccepted
            },
            {
                text: 'Preguntar a qué se refiere',
                next: [
                    {
                        text: '-Digo que, aunque no te sientas cómoda con este mundo visual, siempre podrás simplemente ponerte ' +
                            'de nuevo la venda y volver a la oscuridad. Así, que, si tu decides, puedes continuar con tu vida como ' +
                            'antes. Y si tú quieres vivir así, eso está bien, pero te aconsejaría también que te atrevas, aunque solo ' +
                            'por momentos, a quitárte esa tela y permitirte conocer al mundo en el que vivimos los demás.\n\n' +
                            'Creo que tú tienes ahora una oportunidad única para experimentar dos realidades, con el poder en ' +
                            'tus manos para moverte entre ellas.',
                    },
                    {
                        text: 'Aceptar consejo',
                        next: this.adviceAccepted
                    }
                ]

            },
        ];
        this.content = [
            {
                text: 'El olor a tabaco viejo te alerta a la presencia del doctor Abel, sentado como de costumbre en ' +
                    'el portal de su casa, perdido en sus pensamientos. No es hasta que le saludas que se alerta ' +
                    'a tu presencia, pero cuando lo hace, su sonrisa es audible. Se levanta y, antes de que puedas ' +
                    'reaccionar, te envuelve en un abrazo. Tras calmarse un poco el aire, os envolvéis en una larga ' +
                    'conversación para poneos al día. El doctor consigue resumir en breve más de una década de ' +
                    'ocurrencias en el pueblo, y luego escucha pacientemente mientras le relatas la reciente milagrosa ' +
                    'recuperación de tu vista.'
            },
            {
                text: 'Continuar',
                next: this.advice
            },
        ]
    }
}

export class doctorEvent_1 extends eventScene {
    constructor() {
        super({ key: 'doctorEvent_1' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.fernandoIntroduction = [
            {
                text: '-Sí, Fernando, el leñador. La gente la llama brusco, pero es el hombre más directo y sincero que conozco. Si él dice que hay un problema, me fío de su palabra y no le hago preguntas. Pero si quieres saber más, no seas tímida y habla con él. Trabaja al otro lado del pueblo, así que tienes un buen paseo. \n-Y juzgando por el color de tu cara,- añade con una preocupación -te vendría bien un poco de aire fresco'
            },
            {
                text: 'Vale',
                cb: () => {
                    this.completeMainEvent(5, 0);
                }
            },
            {
                text: '[Ligeramente ofendida] Vale',
                cb: () => {
                    this.completeMainEvent(4, 0);
                }
            }
        ];
        this.problem = [
            {
                text: '-No lo sé, pero si me Fernando me dice que hay un problema, me fío de su palabra. Siempre puedes preguntarle si quieres; vive al otro lado del pueblo.'
            },
            {
                text: 'Vale, veré que ocurre',
                cb: () => {
                    this.completeMainEvent(5, 0);
                }
            }
        ];
        this.content = [
            {
                text: '-Por cierto, -dices, recordando la petición de tu hermano -mi hermano Pedro quería pedirte otra dosis de medicina para un dolor de cabeza. ¿Sabes a los que se refiere?\n\n-Ah, sí, las migrañas de tu hermano. Pues me temo que aún no, necesito corteza de sauce, y Fernando me dice que no puede conseguírmelo ahora mismo.'
            },
            {
                text: '¿Fernando?',
                next: this.fernandoIntroduction
            },
            {
                text: '¿Cuál es el problema?',
                next: this.problem
            }
        ]
    }
}

export class doctorEvent_2 extends eventScene {
    constructor() {
        super({ key: 'doctorEvent_2' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'El doctor suelta una risita cuando te vuelves a acercar \n' +
                    '-No necesitas oír más a este viejo. Si en realidad yo sé muy poco, solo que hablo mucho. ¡Ja! Ese es ' +
                    'el secreto para que te llamen sabio.'
            },
            {
                text: 'Reír al comentario y continuar'
            }
        ]
    }
}

export class doctorEvent_3 extends eventScene {
    constructor() {
        super({ key: 'doctorEvent_3' });
        //array con los elementos de un evento
        this.backgroundImage = 'mainEventMenu';
        this.content = [
            {
                text: 'El doctor te saluda desde lejos con una grande sonrisa en su rostro. \n' +
                    '-¿Has cumplido con lo que te pedi?'
            },
            {
                text: 'Si, me lo agradeció y todo',
                failedText: 'No has ayudado aún al vagabundo',
                condition: function (ref) {
                    return (ref.scene.get('homeless_Event_1').completed)
                },
                next: [
                    {
                        text: '-Ya veo...Ya has visto. Te niegas a ver la realidad como es, pero cuando necesitas ' +
                            'hacerlo, realmente ayudas a la gente. ¿No lo ves? Confío en que entiendes de lo que te hablo.- ' +
                            'El doctor hace se toma un momento para sentarse en el banco. -Tu abuela paso por aquí hace un momento. ' +
                            'Decía que tenía algo para ti. Deberías ir a buscarla. Y por favor, piensa en lo que te he dicho,'
                    },
                    {
                        text: 'Sonriendo, asientes y te despides del doctor',
                        cb: () => {
                            this.completeEvent(20, 20);
                        }
                    }
                ]
            }
        ]
    }
}

export class lumberjack_Event_Idle extends eventScene {
    constructor() {
        super({ key: 'lumberjack_Event_Idle' });
        //array con los elementos de un evento
        this.backgroundImage = 'mainEventMenu';
        this.content = [
            {
                text: 'Parece que hay alguien trabajando aquí. Mejor no molestar.'
            },
            {
                text: 'Continuar',
            }
        ]
    }
}

export class lumberjackEvent_0 extends eventScene {
    constructor() {
        super({ key: 'lumberjackEvent_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.missionAccepted = [
            {
                text: '-En ese caso, creo que puedo ayudar. \n-Bien.- Responde el leñador- Si encuentras tres árboles enfermos, dime dónde están y yo me encargaré.- Y vuelve sin más a su trabajo.'
            },
            {
                text: 'Continuar',
                cb: () => {
                    this.completeEvent(20, 10);
                    this.info.player.scene.nextObjective();
                }
            }
        ]
        this.infectionExplanation = [
            {
                text: '-Por su aspecto, es invisible. Lo único que diferencia un árbol infectado de uno sano es un ligero olor agrio emanando de las hojas.'
            },
            {
                text: 'Aceptar propuesta',
                cb: () => {
                    this.completeEvent(20, 20);
                },
                next: this.missionAccepted
            }
        ]
        this.blindedApproach = [
            {
                text: '-Hola- oyes una voz sorprendentemente suave y compuesta de la dirección del ruido -Mira, sé quién eres, y he oído lo que te ha pasado. Si bienes buscando mi ayuda, lo siento, pero tengo asuntos importantes que atender. \nPero si vienes para ayudar, déjate de tonterías y quítate esa venda de los ojos. No tengo tiempo para tu autocompasión.'
            },
            {
                text: 'Quitar la venda',
                next: this.nonBlindApproach
            },
            {
                text: 'Abandonar a este hombre con sus malos modales'
            }
        ];
        this.nonBlindApproach = [
            {
                text: 'Cuando te acercas al leñador, ves un hombre de tez oscura reposando su hacha en un tronco recién caído. \n-Adelante- dice, cruzándose de brazos -¿Para qué vienes?'
            },
            {
                text: 'Vengo a ayudar',
                cb: () => { },
                next: [
                    {
                        text: 'El hombre no parece echarse atrás a la idea. -De acuerdo. El problema que tengo es que no puedo seguir con mi trabajo habitual por una enfermedad que amenaza a los robles de la sierra. Les pudre el tronco por dentro y hace que se caigan espontáneamente. Por no decir nada de que la madera pierde su valor. \nAl parecer, hay algunos árboles ya infectados en el pueblo. Podré procuparme de otros encargos cuando encuentre esos árboles infectados.'
                    },
                    {
                        text: '¿Cómo se identifica la enfermedad?',
                        next: this.infectionExplanation
                    }
                ]
            },
            {
                text: '¿Cuál es el problema?',
                cb: () => { },
                next: [
                    {
                        text: '-El problema que tengo es que no puedo seguir con mi trabajo habitual por una enfermedad que amenaza a los robles de la sierra. Les pudre el tronco por dentro y hace que se caigan espontáneamente. Por no decir nada de que la madera pierde su valor. \nAl parecer, hay algunos árboles ya infectados en el pueblo. Podré procuparme de otros encargos cuando encuentre esos árboles infectados.'
                    },
                    {
                        text: '¿Cúales son los síntomas de esta enfermedad?',
                        next: this.infectionExplanation
                    }
                ]
            }
        ];
        this.content = [
            {
                text: 'Puedes oler el olor a pino y oír los golpes regulares de un hacha cortando madera. Te paras un momento, insegura de si entrar en este lugar de trabajo.'
            },
            {
                text: 'Avanzar',
                cb: () => {
                    if (this.info.player.scene.blindfold.blind)
                        this.approach = this.blindedApproach;
                    else
                        this.approach = this.nonBlindApproach;
                },
                next: this.approach
            },
            {
                text: 'Darte la vuelta y retornar'
            },
        ]
    }
}

export class lumberjackEvent_1 extends eventScene {
    constructor() {
        super({ key: 'lumberjackEvent_1' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.searchPendingApproach = [
            {
                text: '-Te dije tres árboles, y necesito que sean de diferentes zonas del pueblo. Si no los encuentras no pasa nada, pero no podré ponerme a buscar ingredientes para el médico hasta que los localice.'
            },
            {
                text: 'Aceptar'
            }
        ];
        this.searchCompletedApproach = [
            {
                text: '-Los encontraste.- El tono de su voz denota una sorpresa agradable, sin llegar a ser una exclamación -Pues genial, talaré esos árboles y me pondré de inmediato a buscar el medicamento de tu hermano. Me has hecho un gran favor, y aunque no lo sepa, al bosque también. Te lo agradezco de verdad.'
            },
            {
                text: 'Aceptar y despedirte del leñador',
                cb: () => {
                    this.info.player.scene.nextObjective();
                    this.completeEvent(40, 15);
                }
            }
        ];
        this.content = this.content = [
            {
                text: 'El leñador sigue en su trabajo, y no parece alterarse por tu presencia.'
            },
            {
                text: 'Llamar su atención',
                cb: () => {
                    if (this.info.player.scene.currentObjective >= 4)
                        this.approach = this.searchCompletedApproach;
                    else
                        this.approach = this.searchPendingApproach;
                },
                next: this.approach
            }
        ]
    }
}

export class homeless_Event_0 extends eventScene {
    constructor() {
        super({ key: 'homeless_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'mainEventMenu';
        this.content = [
            {
                text: 'Te cruzas con una persona con una forma de caminar bastante inusual. Lo oyes murmurando algo por lo bajo. -Ese viejo zorro... ' +
                    'Se cree muy listo solo por saber cuatro cosas sobre medicina. Ya sabré yo mejor como está mi salud, ' +
                    'que para algo este es mi cuerpo y no el suyo. Espera, ¿quién anda ahí?'
            },
            {
                text: 'Hola, vengo de parte del doctor',
                next: [
                    {
                        text: '-Si queria algo más me lo podría haber dicho justo ahora que he hablado con él. No necesito ' +
                            'que me traiga un mensajero. Anda, dejame tranquilo.-'
                    },
                    {
                        text: 'Abandonarle un poco ofendida',
                        cb: () => {
                            this.info.player.addSanity(-5);
                        }
                    }
                ]
            },
            {
                text: 'Saludarle con la mano',
                next: [
                    {
                        text: '-¿Nadie? Me lo habré imaginado.- No parece haberte visto. Fijándote en el sonido de sus pasos ' +
                            'te das cuenta de que camina raro. Esa forma de caminar es la misma que como caminabas poco después de ' +
                            'quedarte ciega'
                    },
                    {
                        text: 'Perdona, ¿acaso eres ciego?',
                        next: [
                            {
                                text: '-No hay que ser muy listo para darse cuenta, basta con mirarme'
                            },
                            {
                                text: 'Yo también lo soy. Pero caminas muy raro',
                                next: [
                                    {
                                        text: '-Sin mi bastón caminar se vuelve una tarea imposible. Un día estaba durmiendo tranquilamente ' +
                                            'en la plaza y al despertarme desapareció así sin más. Seguro que el tabernero sabe algo, ese tipo me ' +
                                            'odia desde que nací sin motivo ninguno.'
                                    },
                                    {
                                        text: 'Si tanto lo necesitas puedo ir a buscarlo',
                                        next: [
                                            {
                                                text: '-Si así quieres, yo de aqui no voy a moverme sin él'
                                            },
                                            {
                                                text: 'Ir a buscarlo',
                                                cb: () => {
                                                    this.completeEvent(10, 10);
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Algo le habrás hecho',
                                        next: [
                                            {
                                                text: 'Nada de nada, la duda ofende. Soy la persona más respetable de este pueblo'
                                            },
                                            {
                                                text: 'Irse dudando de sus palabras'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Ignorarle'
            }
        ]
    }
}

export class inkKeeper_Event_0 extends eventScene {
    constructor() {
        super({ key: 'inkKeeper_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'mainEventMenu';
        this.content = [
            {
                text: 'En las proximidades de la taberna encuentras a una persona. Huele bastante a tabaco y ligeramente a alcohol. ' +
                    'Debe de ser el tabernero.'
            },
            {
                text: '¿Me pones algo de beber?',
                next: [
                    {
                        text: 'Estoy en mi descanso, olvídalo'
                    },
                    {
                        text: 'Irse'
                    }
                ]
            },
            {
                text: '¿Conoces al vagabundo?',
                next: [
                    {
                        text: '¿Qué si lo conozco? Bueno si lo conozco. Ese ruín se queda todas las noches hasta las tantas bebiendo ' +
                            'hasta que se queda dormido justo en la puerta de la taberna. A veces incluso se duerme dentro. Suerte ' +
                            'que no le vamos a volver a ver por aquí. Ahuyentaba a la clientela.'
                    },
                    {
                        text: '¿Qué quieres decir con eso?',
                        next: [
                            {
                                text: 'Exactamente lo que he dicho. Sin su bastón ese desgraciado no volverá a asomar por aqui. Lo he tirado detrás ' +
                                    'de la posada. Le he hecho un favor a todo el pueblo'
                            },
                            {
                                text: 'Ah, ya veo'
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

export class cane_Event_0 extends eventScene {
    constructor() {
        super({ key: 'cane_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'mainEventMenu';
        this.content = [
            {
                text: 'Detrás de la taberna encuentras un viejo bastón, el cuál está bastante deteriorado por su uso. ' +
                    'Estará bastante gastado, pero con probarlo un poco te das cuenta de que es bastante resistente'
            },
            {
                text: 'Coger el bastón',
                cb: () => {
                    this.info.prevScene.insertItem(new CaneItem(this.info.prevScene.matter.world,
                        0, 0, this.info.prevScene.itemFrames[1], this.info.player));
                    this.completeEvent(5, 5);
                }
            },
            {
                text: 'No coger el bastón'
            }
        ]
    }
}

export class homeless_Event_1 extends eventScene {
    constructor() {
        super({ key: 'homeless_Event_1' });
        //array con los elementos de un evento
        this.backgroundImage = 'mainEventMenu';
        this.content = [
            {
                text: '-¿Ya estás de vuelta? Hecho bastante en falta mi bastón'
            },
            {
                text: 'Entregarle su bastón y contarle que ocurrió',
                failedText: 'No tienes el bastón',
                condition: function (ref) {
                    return (ref.info.player.inventory.contains('Bastón'))
                },
                next: [
                    {
                        text: '-¿Lo has encontrado? Te lo agradezco, gracias por tu ayuda. ¿Cómo? ¿De verdad fue el tabernero? ' +
                            'Sabía que no podía fiarme de él. Iré con más cuidado a partir de ahora.'
                    },
                    {
                        text: 'Cuidate',
                        cb: () => {
                            this.completeEvent(10, 10);
                        }
                    }
                ]
            },
            {
                text: 'Aún no lo he encontrado'
            }
        ]
    }
}

export class grandMother_Event_1 extends eventScene {
    constructor() {
        super({ key: 'grandMother_Event_1' });
        //array con los elementos de un evento
        this.backgroundImage = 'mainEventMenu';
        this.content = [
            {
                text: 'Te acercas a tu abuela. Sabes que tiene algo importante que decirte, pero aún no sabes qué'
            },
            {
                text: 'Quitarse la venda',
                next: [
                    {
                        text: '-¡María!- Comienza a llorar al darse cuenta de lo que estas haciendo. -Tu padre... antes ' +
                            'de morir, dejó esta carta. Creo que deberías ser tú quien la lea primero'
                    },
                    {
                        text: 'Coger la carta y comenzar a leer',
                        cb: () => {
                            this.completeEvent(10, 10)
                        }
                    }
                ]
            },
            {
                text: 'Aun no estoy lista'
            }
        ]
    }
}

export class painterEvent_0 extends eventScene {
    constructor() {
        super({ key: 'painterEvent_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.event1 = [
            {
                text: 'La pintora se queda incrédula un segundo, pero se alegra notablemente al darse cuenta de lo que ' +
                    'esto significa. La inmensa cantidad de luz del día soleado te hace doler los ojos, pero al pasar un ' +
                    'momento te ajustas y ves los dos paisajes, el de pastel un reflejo de la realidad, pero más saturado ' +
                    'en sus colores, dándole un toque surreal.'
            },
            {
                text: 'Adular',
                cb: () => { },
                next: [
                    {
                        text: 'Das una crítica increíblemente positiva sobre el cuadro, sin ser realmente específico en ningún ' +
                            'detalle, pero no obstante inundando a la joven artista con positividad. Esta está encantada con ' +
                            'cada mención, y te regala un boceto en agradecimiento.',
                    },
                    {
                        text: 'Agradecer y aceptar regalo',
                        cb: () => {
                            this.info.prevScene.insertItem(new SketchItem(this.info.prevScene.matter.world,
                                0, 0, this.info.prevScene.itemFrames[20], this.info.player));
                            this.completeEvent(0, 20);
                        }
                    }
                ]
            },
            {
                text: 'Crítica positiva',
                cb: () => { },
                next: [
                    {
                        text: 'Das una crítica mayoritariamente positiva sobre el cuadro, centrándote en la gama de colores tan ' +
                            'vistosa y agradable. La artista se sonroja un poco, parece que esto era de lo que más orgullosa ' +
                            'estaba. En este tono te confiesa que la inspiración para su estilo lo debe en parte a un ' +
                            'caleidoscopio, el cual te regala como agradecimiento.',
                    },
                    {
                        text: 'Agradecer y aceptar regalo',
                        cb: () => {
                            this.info.prevScene.insertItem(new KaleidoscopeItem(this.info.prevScene.matter.world,
                                0, 0, this.info.prevScene.itemFrames[9], this.info.player));
                            this.completeEvent(0, 20);
                        }
                    }
                ]
            },
            {
                text: 'Crítica analítica',
                cb: () => { },
                next: [
                    {
                        text: 'Sin dejar que la amoción del momento te abrume, das tu opición más sincera sobre el cuadro, ' +
                            'describiendo como te gusta la gama de colores, pero remarcando cómo las líneas del contorno tan ' +
                            'marcadas mancillan el efecto de dichos colores. La artista no se lo toma mal, y con una sonrisa ' +
                            'te da las gracias- sinceridad a cambio de sinceridad.',
                    },
                    {
                        text: 'Animar y despedir',
                        cb: () => {
                            this.completeEvent(30, 20);
                        }
                    }
                ]
            }
        ];
        this.content = [
            {
                text: 'Notas, entre las fragancias del bosque cercano, el olor a colores pastel. Al acercarte, una persona ' +
                    'se torna hacia ti. -¡Ay, no esperaba visitas! -Una voz femenina exclama- La gente no suele venir por ' +
                    'aquí, así que suelo venir cuando quiero pintar. Sinceramente, tenía alguna ilusión por que que alguien ' +
                    'me criticase mi trabajo, pero ¡qué quisquilloso es el destino para acabar aquí tú de todas personas!\n' +
                    '-Bueno, parece que tendré que esperar a otro día para encontrar a mi crítico, pero de mientras, ' +
                    'cuéntame un poco, ¿qué te trae por estas zonas?'
            },
            {
                text: 'Conversar con la artista',
                cb: () => { },
                next: [
                    {
                        text: 'Una breve conversación trivial lleva a la artista a envolverse un poco en temas de teoría de color.\n' +
                            'Comienza a intentar explicar el amarillo como a alguien ciego, y se sorprende mucho cuando le ' +
                            'comentas con una leve sonrisa conocedora que ya conoces los colores.',
                    },
                    {
                        text: 'Continuar',
                        next: this.event1
                    }
                ]
            },
            {
                text: 'Quitar la venda para evaluar el cuadro',
                next: this.event1
            },
        ];

    }
}

export class painterEvent_1 extends eventScene {
    constructor() {
        super({ key: 'painterEvent_1' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
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

export class sickTreeEvent extends eventScene {
    constructor() {
        super({ key: 'sickTreeEvent' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'Este árbol desprende un extraño olor. Debe de estar afectando al resto de árboles\n'
            },
            {
                text: 'Recoger muestra para el leñador',
                cb: () => {
                    this.info.prevScene.insertItem(new SickTreeItem(this.info.prevScene.matter.world,
                        0, 0, this.info.prevScene.itemFrames[1], this.info.player));
                    this.completeEvent(10, 10);
                },
            }
        ]
    }
}

//Evento de paso de nivel
export class maxFaithEvent_0 extends eventScene {
    constructor() {
        super({ key: 'maxFaithEvent_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'Tus acciones se ven recompensadas. Sientes como a medida que ayudas a otras personas tu fe ' +
                    'aumenta. Y eso te hace feliz'
            },
            {
                text: 'Avanzar al siguiente nivel',
                cb: () => {
                    this.completeEvent(0, 0);
                    //este evento no cuenta para el numero de eventos completados
                    this.info.player.numCompletedEvents--;
                    this.scene.stop();
                    this.scene.run('infoLevel', {
                        obtainedFaith: this.info.player.faith, numEvents: this.info.player.numCompletedEvents, nextLevel: 'level1',
                        mainText: 'Meter texto de fin de nivel'
                    })
                },
                end: true
            }
        ]
    }
}

//Evento de paso de nivel
export class deathEvent_0 extends eventScene {
    constructor() {
        super({ key: 'deathEvent_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'eventMenu';
        this.content = [
            {
                text: 'No te sientes bien. Te sientes perdida y confusa. Poco a poco vas perdiendo tus fuerzas'
            },
            {
                text: 'No resistirse',
                cb: () => {
                    this.info.player.setDead();
                    this.completeEvent(0, 0);
                },
                next: [
                    {
                        text: 'Decides rendirte. Todo se vuelve borroso y te desmayas. \n' +
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
                cb: () => { },
                next: [
                    {
                        text: 'Agarras con fuerza la figura y percibes su forma humana a través del tacto. \n' +
                            'Al hacerlo te sientes algo mejor, pero has apretado tanto la figura que se parte en trozos.'
                    },
                    {
                        text: 'Reincorporarse',
                        cb: () => {
                            this.info.player.inventory.removeObjectByKey('Figura tallada');
                        },
                    }
                ]
            },
            {
                text: 'Resistirse desesperadamente',
                cb: () => {
                    if (Math.random() > this.info.player.deathProbability) {
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
                                cb: () => { }
                            }
                        ]
                    }
                }
            }
        ]
    }
}

//#endregion


// condition: function (ref) {
//     return (ref.info.player.inventory.contains('Rama enferma'))
// },
// failedText: 'Aún no has encontrado el árbol enfermo',

