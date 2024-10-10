import { IQueryNode } from "../../abstract/i-query-node";
import { AttributeDisplayProperties } from "../../attribute-display-properties";
import { AttributeNames } from "../../constants/attribute-names";
import { NodeAttribute } from "../../node-attribute";

export class RootLateMaterializeAttribute extends NodeAttribute{

    constructor(node: IQueryNode, value: string) {
        super(node, AttributeNames.rootLateMaterialize, value);
        this.attributeDisplayProperties = new AttributeDisplayProperties(this.value$, AttributeNames.rootLateMaterialize);
    }
}
