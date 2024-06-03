export class EventData {
    name: string;
    value?: any;

    constructor(name: string, value: any= null) {
        this.name = name;
        this.value = value;
    }
}
