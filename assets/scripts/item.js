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
            });
        }
    }
}

//#region UsableItems (isUsable=true)
export class PotionItem extends Item{
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


export class KaleidoscopeItem extends Item{
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

export class StampItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.name = "estampita";
        this.description = "Aumenta la fe";
    }

    doSomething(player) {
        player.addFaith(10);
    }
}

export class BlessingItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.name = "Bendición";
        this.description = "Aumenta bastante la fe";
    }

    doSomething(player) {
        player.addFaith(30);
    }
}

export class OffensiveWordItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.name = "Palabra en braile";
        this.description = "Una palabra escrita en braile que aun no has leido";
    }

    doSomething(player) {
        player.addSanity(-20);
    }
}

export class PositiveWordItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.name = "Palabra en braile";;
        this.description = "Una palabra escrita en braile que aun no has leido";
    }

    doSomething(player) {
        player.addSanity(20);
    }
}

export class BetterBlindFold extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.name = "Venda de tela";;
        this.description = "Una venda de mejor calidad que aumenta la cordura máxima";
    }

    doSomething(player) {
        player.setMaxSanity(player.maxSanity+30);
    }
}

export class SacredFireItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.name = "Fuego sagrado";;
        this.description = "Al mirarlo detenidamente tu cordura maxima disminuye, pero aumenta bastante tu fe";
    }

    doSomething(player) {
        player.setMaxSanity(player.maxSanity - 30);
        player.addFaith(40);
    }
}

//#endregion

//#region KeyItems (isUsable=false)
export class AvoidDeathItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.name = "Figura tallada";
        this.description = "Un recuerdo de alguien muy importante. Te ayudará en momentos de necesidad";
    }
}

//objeto clave de prueba
export class KeyItem1 extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.name = "objeto clave 1";
        this.description = "Prueba de como seria un objeto clave";
    }
}

export class SketchItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.setActive(false).setVisible(false);
        this.name = "boceto";
        this.description = "Un boceto abstracto con una gama de colores cálidos";
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