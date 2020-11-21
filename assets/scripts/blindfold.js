export default class Blindfold extends Phaser.GameObjects.Image {
	constructor(scene, x, y, visionZone) {
		super(scene, x, y, 'blindfold'); //llama a la constructora de Sprite
		this.scene.add.existing(this); //lo añades en la escena

		//me guardo una referencia a la zona de vision
		this.vision = visionZone;
		// reveal image
		this.setVisible(false);

		this.setScale(3, 3); //RENDER NO PUEDE SER MAS QUE OG SPRITE
		//2x al render para que no se vean los bordes
		this.rt = this.scene.add.renderTexture(0, 0, 800 * 3, 600 * 3);
		this.rt.draw(this, 800 * 0.5, 600 * 0.5);
		this.rt.alpha = 0.8;
		this.rt.erase(this.vision);
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
		this.vision = visionZone;
	}

	setRenderPosition(x, y) {
		this.rt.setPosition(x - 400, y - 500);
	}
}