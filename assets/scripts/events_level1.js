import eventScene from './event_scene.js'

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
                                    this.completeEvent(10,10);
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
                        'estas flores si las quieres'
                    },
                    {
                        text: 'Aceptar su regalo',
                        cb: () => {
                            this.info.player.inventory.collect('Flores');
                            this.completeEvent(15,10)
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
                        text:  '-Oh, eso es otra cosa. Estaré encantado de hacer negocios contigo'

                    },
                    {
                        text: 'Con curiosidad, te sientes tentada a investigar la tienda',
                        cb: () => {
                            this.completeEvent(15,15);
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
                            this.info.player.inventory.collect('Venda de tela');
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
                            this.info.player.inventory.collect('Laúdano');
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
                            this.info.player.inventory.collect('Estampita');
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
                    return (ref.info.player.inventory.contains('Flores'));
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
                            this.info.player.inventory.removeObjectByKey('Flores');
                            this.info.player.inventory.collect('Bolsa con monedas');
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
                    this.info.player.inventory.collect('Bolsa con monedas')
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
                    return (ref.info.player.inventory.contains('Cubo vacío'));
                },
                cb: () => {
                    this.info.player.inventory.removeObjectByKey('Cubo vacío');
                    this.info.player.inventory.collect('Cubo lleno');
                }
            },
            {
                text: 'Alejarse con cuidado'
            }
        ]
    }
}

export class cane_Event_0 extends eventScene {
    constructor() {
        super({ key: 'cane_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: 'Haciendo caso de las indicaciones del paciente llegas a la que te dijo que era su casa.\n'+
                'Buscando un poco por los alrededores, consigues encontrar el bastón'
            },
            {
                text: 'Coger el bastón',
                cb: () => {
                    this.info.player.inventory.collect('Bastón');
                    this.completeEvent(5,5);
                }
            },
            {
                text: 'No coger el bastón'
            }
        ]
    }
}

export class foreigner_Event_0 extends eventScene{
    constructor(){
        super({ key: 'foreigner_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: 'Te acercas a alguien muy ruidoso. Habla bastante alto y se nota que no es de por aquí. Tiene un acento extraño que ' +
                'no sabes muy bien de dónde es. -Hey, la de la venda. Tengo un problema. La posada está cerrada. ¡Necesito un lugar ' +
                'para dormir! ¿Puedes hacer algo? LLamando a la puerta no me hacen ni caso'
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
                            this.completeEvent(10,10);
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

export class foreigner_Event_1 extends eventScene{
    constructor(){
        super({ key: 'foreigner_Event_1' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        
        this.content = [
            {
                text: '-¿Lo has conseguido?',
                failedText: 'La posada no está abierta',
                condition: function (ref) {
                    return (ref.scene.get('glassesItem_Event_0').completed === true);
                },
                next: [
                    {
                        text: '-¡Sabía que podía contar contigo! Bueno, lo prometido es deuda.-\n' + 
                        'Te entrega una bolsa con algunas monedas'
                    },
                    {
                        text: 'No hay de qué',
                        cb: () => {
                            this.info.player.inventory.collect('Bolsa con monedas');
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

export class tavern_Event_0 extends eventScene{
    constructor(){
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
                                            this.info.player.inventory.collect('Cubo vacío');
                                            this.completeEvent(10,10);
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

export class glasses_Event_0 extends eventScene{
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
                            this.completeEvent(10,10);
                        }
                    }
                ]
            }
        ]
    }
}

export class glasses_Event_1 extends eventScene{
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
                        'he perdido mis gafas. Sin ellas no puedo trabajar. LLevo horas buscando pero no aparecen'
                    },
                    {
                        text: 'Puedo ayudarte a buscarlas',
                        next: [
                            {
                                text: 'Eso sería muy amable por tu parte. Tienen que estar en la ribera del río ' +
                                'Cuando paseo no me gusta llevarlas puestas, es probable que se me cayeran.' 
                            },
                            {
                                text: 'Voy a buscarlas',
                                cb: () => {
                                    this.completeEvent(15,15);
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

//activar trigger en el evento anterior
export class glassesItem_Event_0 extends eventScene {
    constructor() {
        super({ key: 'glassesItem_Event_0' });
        //array con los elementos de un evento
        this.backgroundImage = 'secondaryEventMenu';
        this.content = [
            {
                text: 'Siguiendo la orilla del río te percatas de unas gafas que se encuentran ocultas en la hierba.' +
                'Huelen igual que la colonia del señor del río'
            },
            {
                text: 'Coger las gafas',
                cb: () => {
                    this.info.player.inventory.collect('Gafas');
                }
            },
            {
                text: 'No coger las gafas'
            }
        ]
    }
}

export class glasses_Event_2 extends eventScene{
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
                next: [
                    {
                        text: '-¡Estupendo! Ya puedo volver a trabajar. La posada abrirá de noche',
                        cb: () => {
                            this.info.player.inventory.removeObjectByKey('Gafas');
                            this.completeEvent(10,10);
                        }
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

// condition: function (ref) {
//     return (ref.info.player.inventory.contains('Rama enferma'))
// },
// failedText: 'Aún no has encontrado el árbol enfermo',

//#endregion