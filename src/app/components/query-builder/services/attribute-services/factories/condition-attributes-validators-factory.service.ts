import { AttributeValidationTypes } from './../constants/attribute-validation-types';
import { Injectable } from '@angular/core';
import { IAttributeValidatorsFactory } from '../abstract/i-attribute-validators-factory';
import { IAttributeValidator } from '../abstract/i-attribute-validator';
import { AttributeNames } from '../../../models/constants/attribute-names';
import { AttributeValidatorRegistryService } from '../attribute-validator-registry.service';

@Injectable({ providedIn: 'root' })

export class ConditionAttributesValidatorsFactoryService implements IAttributeValidatorsFactory {

  constructor(private validators: AttributeValidatorRegistryService) { }
  getSynchronousValidators(attributeName: string): IAttributeValidator[] {
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

  getAsyncValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {
      case AttributeNames.conditionEntity:
        return []  //TODO: implement
      case AttributeNames.conditionAttribute:
        return [this.validators.server(AttributeValidationTypes.serverParentEntityAttribute)]
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

}
