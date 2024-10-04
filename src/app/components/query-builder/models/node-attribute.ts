import { BehaviorSubject, Observable } from 'rxjs';
export class NodeAttribute {
    name: string;
    private _value$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    validationPassed$: Observable<boolean>;

    validationLevel: AttributeValidationLevel;

    private _rawValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private _validValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    
    public get value(): BehaviorSubject<string> {
        return this._value$;
    }
    
    public set value(value: string) {
        //getValidators
        //validate
        

        this._value$.next(value);
    }

    constructor(name: string, value?: string){
        if (value) {
            this._value$ = new BehaviorSubject<string>(value);
        } else {
            this._value$ = new BehaviorSubject<string>('');
        }
    }
}


export abstract class NodeAttributeValidation{
    abstract validate(attribute: NodeAttribute): boolean;
    abstract getErrorMessage(attribute: NodeAttribute): string;
}


export const AttributeValidationLevel = {
    none: 'none',
    name: 'name',
    type: 'type',
    value: 'value',    
    server: 'server',
} as const;
export type AttributeValidationLevel = (typeof AttributeValidationLevel)[keyof typeof AttributeValidationLevel];