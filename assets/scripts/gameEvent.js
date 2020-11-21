class Event
{
//Este es el evento base con todo lo que heredan los eventos individuales
    
    constructor(eventText, eventOptions, eventResults)
    {
        this.text = text;
        this.numOptions = eventOptions;
        this.results = eventResults;
    }
   
}

export default Event;
