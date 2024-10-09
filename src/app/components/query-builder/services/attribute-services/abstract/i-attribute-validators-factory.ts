import { IAttributeValidator } from "./i-attribute-validator";

export interface IAttributeValidatorsFactory {
    getAsyncValidators(attributeName: string): IAttributeValidator[];
    getSynchronousValidators(attributeName: string): IAttributeValidator[];
}