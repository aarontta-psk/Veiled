export default class ObjectiveMarker extends Phaser.Physics.Matter.Sprite {
    constructor(world, player) {
        super(world, player.x, player.y, 'objectiveArrow');

        this.scene.add.existing(this);
        this.player = player;
        this.setScale(0.2, 0.2);
        this.setOrigin(0.5, 0.5);
        this.alpha = 0.8;
        this.setCollidesWith(null);
        this.setDepth(100);
        this.setVisible(true);
        this.distanceToHide = 200;
    }

    updateObjectiveMarker(){
        let obj = this.scene.objectives[this.scene.currentObjective];

        if (obj !== -1 && obj.faithReq <= this.player.faith && Phaser.Math.Distance.Between(this.player.x, this.player.y, 
            this.scene.objectives[this.scene.currentObjective].x, this.scene.objectives[this.scene.currentObjective].y) > this.distanceToHide)
        {
            this.setPosition(this.player.x, this.player.y);
            this.setVisible(true);
            let angle = (180 * Phaser.Math.Angle.Between(this.player.x, this.player.y, obj.x, obj.y) / Math.PI) + 90;
            this.setAngle(angle);
        }
        else
            this.setVisible(false);
    }
}