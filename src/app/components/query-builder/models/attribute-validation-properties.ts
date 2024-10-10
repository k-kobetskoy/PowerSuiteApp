import { BehaviorSubject, Observable } from "rxjs";
import { IAttributeValidator } from "../services/attribute-services/abstract/i-attribute-validator";

export class AttributeValidationProperties {
    asyncValidators: IAttributeValidator[];
    synchronousValidators: IAttributeValidator[];
    syncValidationPassed$: BehaviorSubject<boolean>;
    asyncValidationPassed$: Observable<boolean>;

    constructor() {
        this.asyncValidators = [];
        this.synchronousValidators = [];
        this.syncValidationPassed$ = new BehaviorSubject<boolean>(true);
        this.asyncValidationPassed$ = new Observable<boolean>();
    }
}
