import { Events } from "./events.enum";
import { Eventhandler } from "./eventhandler";
import { EnvironmentsInitHandler } from "./handlers/environments-init-handler";

export class EventHandlerFactory {

    getEventHandler(key: number): Eventhandler {
        switch (key) {
            case Events.EnvironmentsModuleInit:
                return new EnvironmentsInitHandler

            default:
                break;
        }
    }
}
