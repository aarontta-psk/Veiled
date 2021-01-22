//clase venda que oscurece la pantalla aplicando un render texture por encima y haciendole un hueco donde se encuentra el jugador
export default class Blindfold extends Phaser.GameObjects.Image {
	constructor(scene, x, y, visionZone) {
		super(scene, x, y, 'blindfold'); //llama a la constructora de Image
		this.scene.add.existing(this); //lo añades en la escena
		this.setVisible(false);
		this.setScale(3);

		//creamos el renderTexture, una textura especial creada en ejecucion que permite dibujar otros GameObjects sobre ella
		this.rt = this.scene.add.renderTexture(x, y, 940, 970);

		//lo dibujamos en pantalla
		this.rt.draw(this);
		//cambiamos la opacidad para que se vea algo
		this.rt.alpha = 0.8;
		//variable de control que indica si el jugador esta vendado o noi
		this.blind = true;
	}

	//metodo que invierte la visibilidad de la venda
	setBlindfold() {
		this.rt.setVisible(!this.blind);
		this.blind = !this.blind;
	}

	//metodo que establece la visibilidad de la venda segun el booleano
	setBlindfoldOn(boolean) {
		this.rt.setVisible(boolean);
		this.blind = boolean;
	}

	//metodo que coloca la zona oscura de la venda y borra sobre ella la zona de vison del jugador para que pueda ver
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