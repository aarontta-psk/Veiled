export default class Npc extends Phaser.Physics.Matter.Sprite{
    constructor(key, world, x, y, npcEvent, path) {
        super(world, x, y, key); //llama a la constructora de Sprite

        this.scene.add.existing(this); //lo añades en la escena

        this.setBody({
            type: 'rectangle',
            width: 45,
            height:45         
        });
        this.scene.add.existing(this);
        this.scene.matter.add.sprite(this);
        this.setStatic(false);
        this.setSensor(true);
        //se guarda una referencia a la escena de evento de este Npc
        this.npcEvent = npcEvent;

        this.path = path;   //array de puntos del recorrido tres valores: x, y, t(el tiempo de pausa cuando se llega al punto)
        this.px = path.x;
        this.py = path.y;
        this.pathPause = path.pause;
        this.nextPathPoint = 0;    //el indice del array de puntos del recorrido al que nos dirigimos siguiente

        this.state = 'moving';   //still, moving
        this.dest = {x: this.px[this.nextPathPoint], y: this.py[this.nextPathPoint]};
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta); //preUpdate de Sprite (necesario para animaciones)

        if (this.state = 'moving')
        {
            this.move();
        }
    }

    move()
    {
        let [velX, velY] = [0, 0];

        if (Phaser.Math.Distance.Between(this.x, this.y, this.dest.x, this.dest.y) > 3)
        {
            //Calculamos la velocidad
            [velX, velY] = this.calculateVelocity();

            //Aplicamos la velocidad al cuerpo
            this.setVelocity(velX, velY);
        }
        else
        {
            this.state = 'still';
            this.setVelocity(0, 0);
            var timer = this.scene.time.delayedCall(this.pathPause[this.nextPathPoint], this.nextPath(), this);
        }

        //Reproducimos la animación que corresponda
        this.changeAnims(velX, velY);
        
        console.log('NPC state: ' + this.state + 
        '\nSpeed: ' + velX + ', ' + velY + 
        '\nDestination(' + this.nextPathPoint + '): ' + this.dest.x + ', ' + this.dest.y +
        '\nPosition: ' + this.x + ', ' + this.y + 
        '\nDistance to destination: ' + (Phaser.Math.Distance.Between(this.x, this.y, this.dest.x, this.dest.y)));
    }

    nextPath()
    {
        this.nextPathPoint++;
        this.nextPathPoint%= this.px.length;
        this.dest = {x: this.px[this.nextPathPoint], y: this.py[this.nextPathPoint]};
        this.state = 'moving';
    }

    //Calculo de velocidad con respecto a camino definido
    calculateVelocity() {
        let [velX, velY] = [0, 0];

        //Calculo de dirección al siguiente punto del recorrido

        velX = this.dest.x - this.x;
        velY = this.dest.y - this.y;

        //Normalizamos el vector

        let modulus = Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2));
        velX /= modulus;
        velY /= modulus;

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
