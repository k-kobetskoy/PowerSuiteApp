import { IQueryNode } from "../../abstract/i-query-node";
import { AttributeDisplayProperties } from "../../attribute-display-properties";
import { AttributeValidators } from "../../attribute-validators";
import { AttributeNames } from "../../constants/attribute-names";
import { NodeAttribute } from "../../node-attribute";

export class AttributeUserTimeZoneAttribute extends NodeAttribute {

    constructor(node: IQueryNode, validators: AttributeValidators, value?: string, order?: number) {
        super(node, AttributeNames.attributeUserTimeZone, value);
        this.attributeDisplayProperties = new AttributeDisplayProperties(this.value$, AttributeNames.attributeUserTimeZone);
    }
}
