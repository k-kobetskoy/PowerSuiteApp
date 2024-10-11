import { IQueryNode } from "../../../models/abstract/i-query-node";
import { NodeAttribute } from "../../../models/node-attribute";

export interface IAttributeFactory {
    getAttribute(attributeName: string, node: IQueryNode, parserValidation: boolean, value?: string): NodeAttribute;
}