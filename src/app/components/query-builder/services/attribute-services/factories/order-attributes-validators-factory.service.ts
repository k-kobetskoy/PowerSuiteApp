import { Injectable } from '@angular/core';
import { IAttributeValidatorsFactory } from '../abstract/i-attribute-validators-factory';
import { IAttributeValidator } from '../abstract/i-attribute-validator';
import { AttributeNames } from '../../../models/constants/attribute-names';
import { AttributeValidationTypes } from '../constants/attribute-validation-types';
import { AttributeValidatorRegistryService } from '../attribute-validator-registry.service';

@Injectable({
  providedIn: 'root'
})
export class OrderAttributesValidatorsFactoryService implements IAttributeValidatorsFactory {

  constructor(private validators: AttributeValidatorRegistryService) { }

  getSynchronousValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {      
      case AttributeNames.orderDescending:
        return [this.validators.type(AttributeValidationTypes.typeBoolean)]    
      default:
        return []
    }
  }

  getAsyncValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {
      case AttributeNames.orderAttribute:
        return [
          this.validators.condition(AttributeValidationTypes.orderFetchAggregateFalse),
          this.validators.server(AttributeValidationTypes.serverParentEntityAttribute)
        ]      
      case AttributeNames.orderAlias:
        return [this.validators.string(AttributeValidationTypes.alias)]
      default:
        return []
    }
  }

}
