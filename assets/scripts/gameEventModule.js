class Event
{
    //Este es el evento base con todo lo que heredan los eventos individuales
    
    constructor(eventText, eventOptions, sceneRef)
    {
        this.scene = sceneRef;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.text = eventText;
        this.numOptions = eventOptions;

        this.inputKeys = this.scene.input.keyboard.addKeys({ 
            interact: Phaser.Input.Keyboard.KeyCodes.E
        });
    }
   
    interact() {
        return this.inputKeys.interact;
    }
}

export default Event;