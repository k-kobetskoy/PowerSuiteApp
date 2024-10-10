import { IQueryNode } from "../../abstract/i-query-node";
import { AttributeNames } from "../../constants/attribute-names";
import { NodeAttribute } from "../../node-attribute";
import { AttributeDisplayProperties } from "../../attribute-display-properties";
import { AttributeTreeViewDisplayStyle } from "../../constants/attribute-tree-view-display-style";

export class RootAggregateAttribute extends NodeAttribute {

    constructor(node: IQueryNode, value: string) {
        super(node, AttributeNames.rootAggregate, value);
        this.attributeDisplayProperties = new AttributeDisplayProperties(this.value$, AttributeNames.rootAggregate, 'Agg');
    }
}
