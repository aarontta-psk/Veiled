export default class Item extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, frame, player) {
        super(world, x, y, 'items', frame);

        this.setBody({
            type: 'rectangle',
            width: 30,
            height: 30         
        });  

        this.scene.add.existing(this);
        this.scene.matter.add.sprite(this);
        this.setStatic(true);
        this.setSensor(true);

        this.on('pointerdown', () => {
            //se hace su efecto
            this.doSomething(player);
            //se borra del inventario
            player.inventory.removeObject(this);
            //se destruye (y desaparece de GUI)
            this.destroy();
        });
        this.on('pointerover', () => {
            console.log("hovering over item, ", this.name + ": " + this.description);
        });
    }
}

export class potionItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player);
        this.name = "pocion";
        this.description = "Recupera cordura";
    }

    doSomething(player) {
        player.sanity += 30;
        if(player.sanity > 100) player.sanity = 100;
        console.log("pocion usada", player.sanity);
    }
}

export class kaleidoscopeItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player);
        this.name = "caleidoscopio";
        this.description = "Reduce el gasto de cordura con la venda quitada";
    }

    doSomething(player) {
        //aumento el tiempo que tarda en disminuir la cordura
        player.decay = 0.05;
    }
}

//plantilla
// export class NAME extends Item{
//     constructor(world, x, y, frame, player){
//         super(world, x, y, frame, player);
//         this.name = "";
//         this.description = "";
//     }

//     doSomething(player) {

//     }
// }