import { Injectable } from '@angular/core';
import { IAttributeValidatorsFactory } from '../abstract/i-attribute-validators-factory';
import { IAttributeValidator } from '../abstract/i-attribute-validator';
import { AttributeValidatorRegistryService } from '../attribute-validator-registry.service';
import { AttributeNames } from '../../../models/constants/attribute-names';
import { AttributeValidationTypes } from '../constants/attribute-validation-types';

@Injectable({ providedIn: 'root' })

export class FilterAttributesValidatorsFactoryService implements IAttributeValidatorsFactory {

  constructor(private validators: AttributeValidatorRegistryService) { }
  
  getSynchronousValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {
      case AttributeNames.filterType:
        return [this.validators.list(AttributeValidationTypes.listFilterType)] 
      case AttributeNames.filterIsQuickFind:
        return [this.validators.type(AttributeValidationTypes.typeBoolean)] 
      case AttributeNames.filterBypassQuickFind:
        return [this.validators.type(AttributeValidationTypes.typeBoolean)] 
      case AttributeNames.filterOverrideRecordLimit:
        return [this.validators.type(AttributeValidationTypes.typeBoolean)] 
      default:
        return []
    }
  }
  getAsyncValidators(attributeName: string): IAttributeValidator[] {
    return []
  }
}
