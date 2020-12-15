class eventScene extends Phaser.Scene {
    init(data) {
        this.info = data;
    }

    layout(options, group) {
        //variable para separar las opciones en el eje y
        let distancia = 200;
        //antes de mostrar las opciones, borro las anteriores
        group.removeAll(true);
        //para cada opcion
        for (const actOptions of options) {
            console.log(options);
            //añado un texto
            const optionText = this.add.text(50, distancia, actOptions.text).setInteractive().setScale(2);
            //lo añado al container para borrarlo mas adelante
            group.add(optionText);
            distancia += 100;
            //llamo a un callback en caso de que sea pulsado
            optionText.on('pointerdown', () => {
                actOptions.cb();
                //si el evento continua, se llama de nuevo a la funcion
                if (actOptions.next !== undefined) this.layout(actOptions.next, group);
                else {
                    this.scene.stop();
                    this.scene.run(this.info.prevScene.scene.key);
                }
            });
        }
    }

    create() {
        // this.info = this.scene.get('gameScene').info;

        this.completed = false;
        //creo un container que contendra las respuestas
        let group = this.add.container();
        //llamo al metodo que muestra las opcioens
        this.layout(this.content, group);
    }
}

export class testEvent extends eventScene {
    constructor() {
        super({ key: 'testEvent' });
        //array con los elementos de un evento
        this.keyImage = '';
        this.content = [
            {
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
                text: 'hacerle algo al jugador',
                cb: () => {
                    console.log('opcion 3 pulsada');
                    console.log("jugador modificable, se ha pasado a esta escena", this.info.player)
                    this.info.player.speed = 1;
                }
            },
            {
                text: 'texto 4',
                cb: () => {
                    console.log('opcion 4 pulsada');
                },
                next: [
                    {
                        text: 'ok',
                        cb: () => { }
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
                        cb: () => {}
                    }
                ]
            }
        ]
    }
}