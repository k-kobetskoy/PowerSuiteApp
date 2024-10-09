import { IQueryNode } from "../../../models/abstract/i-query-node";
import { NodeAttribute } from "../../../models/node-attribute";

export interface IAttributesService {
    getAttribute(node: IQueryNode, attributeName: string, attributeValue?: string): NodeAttribute;
}
