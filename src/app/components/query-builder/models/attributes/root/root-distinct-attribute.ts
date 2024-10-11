import { IQueryNode } from "../../abstract/i-query-node";
import { AttributeNames } from "../../constants/attribute-names";
import { NodeAttribute } from "../../node-attribute";
import { AttributeDisplayProperties } from "../../attribute-display-properties";
import { AttributeTreeViewDisplayStyle } from "../../constants/attribute-tree-view-display-style";
import { AttributeValidators } from "../../attribute-validators";

export class RootDistinctAttribute extends NodeAttribute {

    constructor(node: IQueryNode, validators: AttributeValidators, value?: string, order?: number) {
        super(node, AttributeNames.rootDistinct,validators, true,  value);
        this.attributeDisplayProperties = new AttributeDisplayProperties(this.value$, AttributeNames.rootDistinct, 'Dst', AttributeTreeViewDisplayStyle.onlyName);
        this.validators = validators;
    }
}
