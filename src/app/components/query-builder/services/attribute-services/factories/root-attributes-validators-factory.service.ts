import { AttributeValidationTypes } from './../constants/attribute-validation-types';
import { Injectable } from '@angular/core';
import { IAttributeValidator } from '../abstract/i-attribute-validator';
import { IAttributeValidatorsFactory } from '../abstract/i-attribute-validators-factory';
import { AttributeValidatorRegistryService } from '../attribute-validator-registry.service';
import { AttributeNames } from '../../../models/constants/attribute-names';

@Injectable({ providedIn: 'root' })

export class RootAttributesValidatorsFactoryService implements IAttributeValidatorsFactory {

  constructor(private validators: AttributeValidatorRegistryService) { }

  getAsyncValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {
      case AttributeNames.rootTop:
        return [this.validators.type(AttributeValidationTypes.typeNumber)]
      case AttributeNames.rootDistinct:
        return [this.validators.type(AttributeValidationTypes.typeBoolean)]
      case AttributeNames.rootAggregate:
        return [this.validators.type(AttributeValidationTypes.typeBoolean)]
      case AttributeNames.rootTotalRecordsCount:
        return [this.validators.type(AttributeValidationTypes.typeBoolean)]
      case AttributeNames.rootLateMaterialize:
        return [this.validators.type(AttributeValidationTypes.typeBoolean)]
      case AttributeNames.rootTotalRecordsCount:
        return [this.validators.type(AttributeValidationTypes.typeNumber)]
      case AttributeNames.rootPage:
        return [this.validators.type(AttributeValidationTypes.typeNumber)]   
      default:
        return []
    }
  }

  getSynchronousValidators(attributeName: string): IAttributeValidator[] {
    return []
  }
}