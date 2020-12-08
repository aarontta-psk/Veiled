export default class Npc extends Phaser.Physics.Matter.Sprite{
    constructor(key, world, x, y, myScene, path) {
        super(world, x, y, key); //llama a la constructora de Sprite

        this.scene.add.existing(this); //lo añades en la escena

        this.setBody({
            type: 'rectangle',
            width: 45,
            height:45         
        });
        this.scene.add.existing(this);
        this.scene.matter.add.sprite(this);
        this.setStatic(true);
        this.setSensor(true);
        //se guarda una referencia a la escena de evento de este Npc
        this.myScene = myScene;

        this.path = path;   //array de puntos del recorrido tres valores: x, y, t(el tiempo de pausa cuando se llega al punto)
        this.nextPathPoint = 0;    //el indice del array de puntos del recorrido al que nos dirigimos siguiente

        this.state = 'still';   //still, moving
        this.stopTimer = scene.time.addEvent(timer);     //contador de tiempo cuando se para
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta); //preUpdate de Sprite (necesario para animaciones)

        //Calculamos la velocidad
        let [velX, velY] = this.calculateVelocity();

        //Aplicamos la velocidad al cuerpo
        this.setVelocity(velX, velY);

        //Reproducimos la animación que corresponda
        this.changeAnims(velX, velY);
    }

    //Calculo de velocidad con respecto a camino definido
    calculateVelocity() {
        let [velX, velY] = [0, 0];

        if (this.state === 'moving')
        {
            this.stopTimer.Start()
            
        }
        //Calculo de dirección al siguiente punto del recorrido

        let [destX, destY] = [path[this.nextPathPoint][0], path[this.nextPathPoint][1]];

        //Normalizamos el vector
        if (velX != 0 && velY != 0) {
            velX /= Math.sqrt(2);
            velY /= Math.sqrt(2)
        }

        //devolvemos velocidad
        return [velX, velY];
    }

    //cambio de animacion con respecto a la velocidad
    changeAnims(velX, velY) {
        if (velX === 0) {
            if (velY === 0)
                this.anims.play('idle', true);
            else if (velY < 0)
                this.anims.play('up_move', true);
            else
                this.anims.play('down_move', true);
        }
        else if (velX < 0)
            this.anims.play('left_move', true);
        else
            this.anims.play('right_move', true);
    }
}
