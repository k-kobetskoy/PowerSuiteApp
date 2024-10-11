import { IAttributeValidator } from "../services/attribute-services/abstract/i-attribute-validator";

export class AttributeValidators {
    defaultAsyncValidators: IAttributeValidator[];
    parsingSynchronousValidators: IAttributeValidator[];
    parsingAsyncValidators: IAttributeValidator[];
}
