import { BehaviorSubject } from "rxjs";
import { ITagProperty } from "./abstract/i-tag-property";

export class TagProperty<T> implements ITagProperty<T> {
    name: string;
    value$?: BehaviorSubject<T>;

    constructor(name: string, value?: T) {
        this.name = name;

        if (value) {
            this.value$ = new BehaviorSubject<T>(value);
        } else {
            this.value$ = new BehaviorSubject<T>(null);
        }
    }
}
