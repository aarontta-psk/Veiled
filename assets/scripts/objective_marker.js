export default class ObjectiveMarker extends Phaser.Physics.Matter.Sprite {
    constructor(world, player) {
        super(world, player.x, player.y, 'objectiveArrow');

        this.player = player;
        this.setScale(0.2, 0.2);
        this.setOrigin(0, 0);
        this.alpha = 0.8;
        this.setCollidesWith(null);
        this.setDepth(100);
        this.setVisible(true);
    }

    updateObjectiveMarker(){
        let obj = this.scene.objectives[this.scene.currentObjective];

        //if (obj !== -1 && obj.faithReq <= this.player.faith)
        {
            this.setPosition(this.player.x, this.player.y);
            this.setVisible(true);
            let angle = (180 * Phaser.Math.Angle.Between(this.player.x, this.player.y, obj.x, obj.y) / Math.PI) + 90;
            this.setAngle(angle);
        }
        //else
            //this.setVisible(false);
    }
}