export default class Blindfold extends Phaser.GameObjects.Image {
	constructor(scene, x, y, visionZone) {
		super(scene, x, y, 'blindfold'); //llama a la constructora de Sprite
		this.scene.add.existing(this); //lo añades en la escena
		this.setVisible(false);
		this.setScale(3);

		this.rt = this.scene.add.renderTexture(x, y, 940, 970);

		this.rt.draw(this);
		this.rt.alpha = 0.8;

		this.blind = true;
	}

	setBlindfold() {
		this.rt.setVisible(!this.blind);
		this.blind = !this.blind;
	}

	setBlindfoldOn(boolean) {
		this.rt.setVisible(boolean);
		this.blind = boolean;
	}

	setVision(visionZone, playerX, playerY) {
		//si la camara se está moviendo en ambos ejes,
		if (this.prevWorldX !== Math.round(this.scene.cameras.main.worldView.x) ||
			this.prevWorldY !== Math.round(this.scene.cameras.main.worldView.y)) {
			//guardamos la posicion previa de la camara
			this.prevWorldX = Math.round(this.scene.cameras.main.worldView.x);
			this.prevWorldY = Math.round(this.scene.cameras.main.worldView.y);

			//movemos el renderer
			const [PosRtX, PosRtY] = [this.scene.cameras.main.worldView.x, this.scene.cameras.main.worldView.y];
			this.rt.setPosition(PosRtX, PosRtY - 200);
		}
		//si no se mueve
		if (this.prevWorldX === Math.round(this.scene.cameras.main.worldView.x) &&
			this.prevWorldY === Math.round(this.scene.cameras.main.worldView.y)) {
			//redibujamos el renderer en el mismo sitio, perocon una visionZone desplazada
			this.rt.clear();
			this.rt.draw(this);
			//la relacion entre la posicion de la camara y del jugador
			this.rt.erase(visionZone, playerX - this.scene.cameras.main.worldView.x,
				playerY - this.scene.cameras.main.worldView.y + 200);
		}
	}
}