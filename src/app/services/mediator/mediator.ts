import { EventHandlerFactory } from "./event-handler-factory";

export class Mediator {
    
    constructor(private eventHandlerFactory: EventHandlerFactory){}

    notify(event: number) {
        this.eventHandlerFactory.getEventHandler(event).handleEvent()
    }
}
