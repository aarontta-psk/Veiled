export default class Blindfold extends Phaser.GameObjects.Image {
	constructor(scene, x, y, visionZone) {
		super(scene, x, y, 'blindfold'); //llama a la constructora de Sprite
		this.scene.add.existing(this); //lo añades en la escena
		this.setScale(3);

		this.rt = this.scene.add.renderTexture(x, y, 940, 970);
		this.setVisible(false);

		this.rt.draw(this);
		this.rt.alpha = 0.8;
		
		this.blind = true;
	}

	setBlindfold() {
		if (this.blind) {
			this.rt.setVisible(false);
			this.blind = false;
		}
		else {
			this.rt.setVisible(true);
			this.blind = true;
		}
	}



		
		setVision(visionZone, playerX, playerY) {
			//si la camara se está moviendo en ambos ejes,
			if(this.prevWorldX !== Math.round(this.scene.cameras.main.worldView.x) ||
				this.prevWorldY !== Math.round(this.scene.cameras.main.worldView.y)){

				this.prevWorldX = Math.round(this.scene.cameras.main.worldView.x);
				this.prevWorldY = Math.round(this.scene.cameras.main.worldView.y);

				const [PosRtX, PosRtY] = [this.scene.cameras.main.worldView.x, this.scene.cameras.main.worldView.y];
				this.rt.setPosition(PosRtX,PosRtY - 200);
			}
			//si no se mueve
			if (this.prevWorldX === Math.round(this.scene.cameras.main.worldView.x) &&
			this.prevWorldY === Math.round(this.scene.cameras.main.worldView.y)){
				this.rt.clear();

				console.log("son iguales")
				this.rt.draw(this);
				this.rt.erase(visionZone, playerX-this.scene.cameras.main.worldView.x, playerY-this.scene.cameras.main.worldView.y + 200);

			}
	}
}