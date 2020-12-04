export default class Blindfold extends Phaser.GameObjects.Image {
	constructor(scene, x, y, visionZone) {
		super(scene, x, y, 'blindfold'); //llama a la constructora de Sprite
		this.scene.add.existing(this); //lo añades en la escena

		// reveal image
		this.setVisible(false);
		
		this.rt = this.scene.add.renderTexture(0, 0, 800, 600);
		this.rt.setScrollFactor(0); //hacemos 
		this.rt.draw(this, 800, 600);
		this.rt.alpha = 0.8;
		this.rt.erase(visionZone);

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

	setVision(visionZone) {
		this.rt.clear();
		this.rt.draw(this, 800 * 0.5, 600 * 0.5);
		this.rt.erase(visionZone);
	}
}