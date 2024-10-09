import { BehaviorSubject, Observable } from 'rxjs';
import { IQueryNode } from './abstract/i-query-node';
import { IAttributeValidator } from '../services/attribute-services/abstract/i-attribute-validator';

export class NodeAttribute {

    parentNode: IQueryNode;
    name: string;
    validators: IAttributeValidator[] = [];
    oneTimeValidators: IAttributeValidator[] = [];
    isValidName: boolean;
    
    value$: BehaviorSubject<string> = new BehaviorSubject<string>('');        

    validationPassed$: Observable<boolean>;


    constructor(node: IQueryNode, name: string, value: string) {
        this.parentNode = node;
        this.name = name;

        if (value) {
            this.value$.next(value);
        }
    }
}