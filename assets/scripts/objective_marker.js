//clase que indica al jugador donde estan los eventos principales del nivel. Tiene forma de flecha
export default class ObjectiveMarker extends Phaser.Physics.Matter.Sprite {
    constructor(world, player) {
        super(world, player.x, player.y, 'objectiveArrow'); //constructora de sprite

        this.scene.add.existing(this); //se añade a la escena
        this.player = player; //referencia al jugador
        //se ajusta
        this.setScale(0.2, 0.2);
        this.setOrigin(0.5, 0.5);
        this.alpha = 0.8;
        //desactivamos sus colisiones
        this.setCollidesWith(null);
        this.setDepth(100);
        this.setVisible(true);
        //distancia en la cual se esconde la flecha al acercarse mucho al objetivo
        this.distanceToHide = 200;
    }

    //metodo que actualiza hacia donde apunta la flecha y si es visible
    updateObjectiveMarker(){
        //obtenemos el objetivo actual del array de objetivos
        let obj = this.scene.objectives[this.scene.currentObjective];

        //si no se han terminado los objetivos, se tiene cierto requesito de fe y la distancia es mayor a distanceToHide
        if (obj !== -1 && obj.faithReq <= this.player.faith && Phaser.Math.Distance.Between(this.player.x, this.player.y, 
            this.scene.objectives[this.scene.currentObjective].x, this.scene.objectives[this.scene.currentObjective].y) > this.distanceToHide)
        {
            //ajustamos la posicion, el angulo y hacemos visible la flecha
            this.setPosition(this.player.x, this.player.y);
            this.setVisible(true);
            let angle = (180 * Phaser.Math.Angle.Between(this.player.x, this.player.y, obj.x, obj.y) / Math.PI) + 90;
            this.setAngle(angle);
        }
        else
        //en caso contrario ocultamos la flecha
            this.setVisible(false);
    }
}