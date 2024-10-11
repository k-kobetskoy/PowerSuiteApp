import { AttributeValidationTypes } from '../constants/attribute-validation-types';
import { Injectable } from '@angular/core';
import { IAttributeFactory } from '../abstract/i-attribute-validators-factory';
import { IAttributeValidator } from '../abstract/i-attribute-validator';
import { AttributeNames } from '../../../models/constants/attribute-names';
import { AttributeValidatorRegistryService } from '../attribute-validator-registry.service';
import { IQueryNode } from '../../../models/abstract/i-query-node';
import { NodeAttribute } from '../../../models/node-attribute';
import { AttributeValidators } from '../../../models/attribute-validators';
import { AttributeTreeViewDisplayStyle } from '../../../models/constants/attribute-tree-view-display-style';

@Injectable({ providedIn: 'root' })

export class ConditionAttributesFactoryService implements IAttributeFactory {

  constructor(private validators: AttributeValidatorRegistryService) { }

  getAttribute(attributeName: string, node: IQueryNode, parserValidation: boolean, value?: string): NodeAttribute {
    const validators: AttributeValidators = this.getAttributeValidators(attributeName, parserValidation);

    switch (attributeName) {
      case AttributeNames.conditionEntity:
        return new NodeAttribute(node, attributeName, validators, 'Entity', AttributeTreeViewDisplayStyle.onlyValue, value, 1);      
      case AttributeNames.conditionAttribute:
        return new NodeAttribute(node, attributeName, validators, 'Attribute', AttributeTreeViewDisplayStyle.onlyValue, value, 2);      
      case AttributeNames.conditionOperator:
        return new NodeAttribute(node, attributeName, validators, 'Operator', AttributeTreeViewDisplayStyle.onlyValue, value, 3);      
      case AttributeNames.conditionValue:
        return new NodeAttribute(node, attributeName, validators, 'Value', AttributeTreeViewDisplayStyle.onlyValue, value, 4);      
      case AttributeNames.conditionValueOf:
        return new NodeAttribute(node, attributeName, validators, 'ValueOf', AttributeTreeViewDisplayStyle.onlyValue, value, 5);
      default:
        return new NodeAttribute(node, attributeName, validators, null, null, value, null, false);
    }
  }

  private getAttributeValidators(attributeName: string, parserValidation: boolean): AttributeValidators {
    let parsingSyncValidators: IAttributeValidator[] = [];
    let parsingAsyncValidators: IAttributeValidator[] = [];
    if (parserValidation) {
      parsingSyncValidators = this.getParserSynchronousValidators(attributeName);
      parsingAsyncValidators = this.getParserAsyncValidators(attributeName);
    }

    return { defaultAsyncValidators: this.getDefaultAsyncValidators(attributeName), parsingAsyncValidators: parsingAsyncValidators, parsingSynchronousValidators: parsingSyncValidators };
  }

  private getParserSynchronousValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {
      case AttributeNames.conditionEntity:
        return []  //TODO: implement
      case AttributeNames.conditionValue:
        return [
          this.validators.type(AttributeValidationTypes.conditionValueTypes) // check if value is of attribute's type
        ]
      case AttributeNames.conditionOperator:
        return [
          this.validators.list(AttributeValidationTypes.conditionValueList) // should check if value is in the list of operators allowed for attribute
        ]
      case AttributeNames.conditionValueOf:
        return [
          this.validators.server(AttributeValidationTypes.serverValueOfAttribute), // should check if the ValueOf is of the same type as the condition attribute
        ]
      default:
        return []
    }
  }

  private getParserAsyncValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {
      case AttributeNames.conditionEntity:
        return []  //TODO: implement
      case AttributeNames.conditionValue:
        return [
          this.validators.condition(AttributeValidationTypes.conditionValueAttributeNameNotNull),
        ]
      case AttributeNames.conditionOperator:
        return [
          this.validators.condition(AttributeValidationTypes.conditionValueAttributeNameNotNull),
        ]
      case AttributeNames.conditionValueOf:
        return [
          this.validators.condition(AttributeValidationTypes.conditionValueAttributeNameNotNull),
        ]
      default:
        return []
    }
  }

  private getDefaultAsyncValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {
      case AttributeNames.conditionEntity:
        return []  //TODO: implement
      case AttributeNames.conditionAttribute:
        return [this.validators.server(AttributeValidationTypes.serverParentEntityAttribute)]
      default:
        return []
    }
  }
}
