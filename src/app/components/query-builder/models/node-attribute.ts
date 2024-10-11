import { BehaviorSubject, Observable } from 'rxjs';
import { IQueryNode } from './abstract/i-query-node';
import { AttributeValidators } from './attribute-validators';
import { AttributeDisplayProperties } from './attribute-display-properties';
import { AttributeTreeViewDisplayStyle } from './constants/attribute-tree-view-display-style';

export class NodeAttribute {
    parentNode: IQueryNode;
    name: string;
    order: number;
    isValidName: boolean;
    value$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    validators: AttributeValidators;
    attributeDisplayProperties: AttributeDisplayProperties;

    syncValidationPassed$: BehaviorSubject<boolean>;
    asyncValidationPassed$: Observable<boolean>;

    constructor(
        node: IQueryNode,
        name: string,
        validators: AttributeValidators,
        treeViewDisplayName?: string,
        treeViewDisplayStyle: string = AttributeTreeViewDisplayStyle.none,
        value?: string,
        order = 99,
        isValidname: boolean = true) {
        this.parentNode = node;
        this.name = name;
        this.validators = validators;
        this.order = order;
        this.isValidName = isValidname;

        if (value) {
            this.value$.next(value);
        }
    }
}