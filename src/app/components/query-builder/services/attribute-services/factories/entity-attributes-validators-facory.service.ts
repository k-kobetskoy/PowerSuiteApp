import { Injectable } from '@angular/core';
import { IAttributeValidatorsFactory } from '../abstract/i-attribute-validators-factory';
import { IAttributeValidator } from '../abstract/i-attribute-validator';
import { AttributeNames } from '../../../models/constants/attribute-names';
import { DataverseEntityTypeNames } from '../../../models/constants/dataverse-entity-type-names';
import { AttributeValidationTypes } from '../constants/attribute-validation-types';
import { AttributeValidatorRegistryService } from '../attribute-validator-registry.service';

@Injectable({ providedIn: 'root' })

export class EntityAttributesValidatorsFacoryService implements IAttributeValidatorsFactory {

  constructor(private validators: AttributeValidatorRegistryService) { }

  getSynchronousValidators(attributeName: string): IAttributeValidator[] {
    return []
  }

  getAsyncValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {
      case AttributeNames.entityName:
        return [this.validators.server(DataverseEntityTypeNames.entity)]
      case AttributeNames.entityName:
        return [this.validators.string(AttributeValidationTypes.alias)]
      default:
        return []
    }
  }
}
