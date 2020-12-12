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

        this.px = path.x;
        this.py = path.y;
        this.pathPause = path.pause;
        console.log(this.pathPause);
        this.nextPathPoint = 0;    //el indice del array de puntos del recorrido al que nos dirigimos siguiente

        this.speed = 1.5;
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


        console.log('NPC state: ' + this.state + ', speed: ' + velX + ', ' + velY + '\nDestination: '+ this.dest.x + 
        ', ' + this.dest.y + '\nDistance to destination: ' + 
        Phaser.Math.Distance.Between(this.x, this.dest.x, this.y, this.dest.y));

        

        if (Phaser.Math.Distance.Between(this.x, this.dest.x, this.y, this.dest.y) > 1)
        {
            //Calculamos la velocidad
            [velX, velY] = this.calculateVelocity();

            //Aplicamos la velocidad al cuerpo
            this.setVelocity(velX*this.speed, velY*this.speed);
        }
        else
        {
            this.state = 'still';
            this.setVelocity(0, 0);
            console.log(this.nextPathPoint);
            var timer = this.scene.time.delayedCall(this.pathPause[this.nextPathPoint], this.nextPath(), this);
        }

        //Reproducimos la animación que corresponda
        this.changeAnims(velX, velY);
        
    }

    nextPath()
    {
        this.nextPathPoint++;
        if (this.nextPathPoint >= this.px.length)
            this.nextPathPoint = 0;
        this.dest.x = this.px[this.nextPathPoint];
        this.dest.y = this.py[this.nextPathPoint];
        this.state = 'moving';


        let [velX, velY] = this.calculateVelocity();
        this.setVelocity(velX, velY);
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
