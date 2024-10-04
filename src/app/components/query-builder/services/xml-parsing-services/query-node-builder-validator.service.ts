import { Injectable } from '@angular/core';
import { ITagBuildEntity, IBuildQueryError, ITagBuildEntityAttribute } from './query-node-builder.service';
import { QueryNodeType } from '../../models/constants/query-node-type';
import { IQueryNode } from '../../models/abstract/i-query-node';
import { TagPropertyType } from '../../models/constants/tag-property-type';


export const UNEXPECTED_ERROR_TEXT = 'Unexpected error. Please check you XML';

export interface IAttributeTypeValidation{
  success: boolean;
  errorMessage: string;
}

const queryNodeTypeValues = new Set(Object.values(QueryNodeType));


@Injectable({ providedIn: 'root' })
export class QueryNodeBuilderValidatorService {

  constructor() { }

  validateTag(tag: ITagBuildEntity, errors: IBuildQueryError[]): boolean {

    if (!tag) {
      errors.push({ errorMessage: UNEXPECTED_ERROR_TEXT });
      return false;
    }

    if (!tag.tagName) {
      errors.push({ errorMessage: this.getTagNameErrorMessage(tag.tagName), from: tag.from, to: tag.to });
      return false;
    }

    if (!this.isValidQueryNodeType(tag.tagName)) {
      errors.push({ errorMessage: this.getTagNameErrorMessage(tag.tagName), from: tag.from, to: tag.to });
      return false;
    }

    return true;
  }

  validateAttributeName(attribute: ITagBuildEntityAttribute, tag: IQueryNode, errors: IBuildQueryError[]): boolean {

    if (!attribute || !tag) {
      errors.push({ errorMessage: UNEXPECTED_ERROR_TEXT });
      return false;
    }

    if (!attribute.name) {
      errors.push({ errorMessage: UNEXPECTED_ERROR_TEXT });
      return false;
    }

    if (!tag.tagProperties.validateTagPropertyName(attribute.name)) {
      errors.push({ errorMessage: this.getAttributeNameErrorMessage(attribute.name), from: attribute.nameFrom, to: attribute.nameTo });
      return false;
    }

    return true;
  }

  validateAttributeValueType(attribute: ITagBuildEntityAttribute, tag: IQueryNode, errors: IBuildQueryError[]): IAttributeTypeValidation {

    if (!attribute || !tag) {
      errors.push({ errorMessage: UNEXPECTED_ERROR_TEXT });
      return {success: false, errorMessage: UNEXPECTED_ERROR_TEXT};
    }

    let tagProperty = tag.tagProperties.getTagPropertyByName(attribute.name);

    const attributeValue = attribute.value;

    if (tagProperty.constructorValue$) {

      const tagPropertyType = tagProperty.typeIndicator;
      const errorMessage = this.getAttributeValueErrorMessage(attributeValue);

      if (tagPropertyType === TagPropertyType.STRING && typeof attributeValue !== 'string') {        

        errors.push({ errorMessage: errorMessage, from: attribute.valueFrom, to: attribute.valueTo });
        return {success: false, errorMessage: errorMessage};
      }

      if (tagPropertyType === 'Number' && !this.isNumber(attributeValue)) {
        errors.push({ errorMessage: errorMessage, from: attribute.valueFrom, to: attribute.valueTo });
        return  {success: false, errorMessage: errorMessage};
      }

      if (tagPropertyType === 'Boolean' && !this.isBoolean(attributeValue)) {
        errors.push({ errorMessage: errorMessage, from: attribute.valueFrom, to: attribute.valueTo });
        return  {success: false, errorMessage: errorMessage};
      }
    }

    return {success: true, errorMessage: null};
  }

  private isNumber(value: string): boolean {
    const trimmedValue = value.trim();

    return trimmedValue === '' || !isNaN(Number(trimmedValue));
  }

  private isBoolean(value: string):boolean{

    const trimmedValue = value.trim().toLowerCase();

    return trimmedValue === '' || trimmedValue === 'true' || trimmedValue === 'false';
  }

  private isValidQueryNodeType(tagName: string): tagName is QueryNodeType {
    return queryNodeTypeValues.has(tagName as QueryNodeType);
  }

  private getAttributeNameErrorMessage(attributeName: string): string {
    return `Attribute name '${attributeName}' is not valid`;
  }

  private getAttributeValueErrorMessage(attributeValue: string): string {
    return `Attribute value type '${attributeValue}' is not valid`;
  }

  private getTagNameErrorMessage(tagName: string): string {
    return `Tag name '${tagName}' is not valid`;
  }
}
