import { BehaviorSubject, Observable } from 'rxjs';
import { IQueryNode } from './abstract/i-query-node';
import { AttributeValidationProperties } from './attribute-validation-properties';
import { AttributeDisplayProperties } from './attribute-display-properties';

export class NodeAttribute {
    parentNode: IQueryNode;
    name: string;
    value$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    attributeValidationProperties: AttributeValidationProperties = new AttributeValidationProperties();
    attributeDisplayProperties: AttributeDisplayProperties;

    constructor(node: IQueryNode, name: string, value: string) {
        this.parentNode = node;
        this.name = name;

        if (value) {
            this.value$.next(value);
        }
    }
}