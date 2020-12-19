export default class Item extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, frame, player, isUsable) {
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

        this.on('pointerover', () => {
            this.scene.gui.setInfoText(this.name + ": " + this.description);
        });
        this.on('pointerout', () => {
            this.scene.gui.setInfoText("");
        });
        if(isUsable){
            this.on('pointerdown', () => {
                //se hace su efecto
                this.doSomething(player);
                //se borra del inventario
                player.inventory.removeObject(this);
                this.scene.gui.relocateInventory();
                //se destruye (y desaparece de GUI)
                this.destroy();
            });
        }
    }
}

//#region UsableItems (isUsable=true)
export class potionItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
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
        super(world, x, y, frame, player, true);
        this.name = "caleidoscopio";
        this.description = "Reduce el gasto de cordura con la venda quitada";
    }

    doSomething(player) {
        //aumento el tiempo que tarda en disminuir la cordura
        player.decay = 0.05;
    }
}

export class sketchItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.setActive(false).setVisible(false);
        this.name = "boceto";
        this.description = "Un boceto abstracto con una gama de colores cálidos";
    }

    doSomething(player) {
    }
}
//#endregion

//#region KeyItems (isUsable=false)
//objeto clave de prueba
export class keyItem1 extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.name = "objeto clave 1";
        this.description = "Prueba de como seria un objeto clave";
    }
}
//#endregion

// plantilla
// export class NAME extends Item{
//     constructor(world, x, y, frame, player){
//         super(world, x, y, frame, player, true...false);
//         this.name = "";
//         this.description = "";
//     }

//     doSomething(player) {

//     }
// }