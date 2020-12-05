class eventScene extends Phaser.Scene {
    layout(options) {
        let distancia = 200;
        for(const o of options){
            console.log(options);
            const t = this.add.text(50, distancia, o.text).setInteractive().setScale(2);
            distancia+= 100;
            t.on('pointerdown', () => {
                o.cb();
            });
        }
    }

    create(){
        this.layout(this.content);
    }
    
}

export default class testEvent extends eventScene {
    constructor(){
        super({key: 'testEvent'});
        //array con los elementos de un evento
        this.keyImage = '';
        this.content =  [
            {
                text: 'texto 1',
                cb: () => {
                    console.log('opcion 1 pulsada');
                }
            },
            {
                text: 'texto 2',
                cb: () => {
                    console.log('opcion 2 pulsada');
                }
            },
            {
                text: 'texto 3',
                cb: () => {
                    console.log('opcion 3 pulsada');
                }
            },
            {
                text: 'texto 4',
                cb: () => {
                    console.log('opcion 4 pulsada');
                }
            }
        ]
    }
}