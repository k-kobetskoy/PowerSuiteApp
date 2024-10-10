import { IQueryNode } from "../../abstract/i-query-node";
import { AttributeNames } from "../../constants/attribute-names";
import { NodeAttribute } from "../../node-attribute";
import { AttributeDisplayProperties } from "../../attribute-display-properties";

export class RootDistinctAttribute extends NodeAttribute {

    constructor(node: IQueryNode, value: string) {
        super(node, AttributeNames.rootDistinct, value);
        this.attributeDisplayProperties = new AttributeDisplayProperties(this.value$, AttributeNames.rootDistinct, 'Dst');
    }
}
