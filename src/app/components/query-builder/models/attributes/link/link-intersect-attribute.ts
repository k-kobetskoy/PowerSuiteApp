import { IQueryNode } from "../../abstract/i-query-node";
import { AttributeDisplayProperties } from "../../attribute-display-properties";
import { AttributeValidators } from "../../attribute-validators";
import { AttributeNames } from "../../constants/attribute-names";
import { AttributeTreeViewDisplayStyle } from "../../constants/attribute-tree-view-display-style";
import { NodeAttribute } from "../../node-attribute";

export class LinkIntersectAttribute extends NodeAttribute {
    constructor(node: IQueryNode, validators: AttributeValidators, value?: string, order?: number) {
        super(node, AttributeNames.linkIntersect,validators, true,  value);
        this.attributeDisplayProperties = new AttributeDisplayProperties(this.value$, AttributeNames.linkIntersect, 'M:M', AttributeTreeViewDisplayStyle.onlyName);
        this.validators = validators;
    }
}
