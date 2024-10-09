import { Injectable } from '@angular/core';
import { IAttributeValidatorsFactory } from '../abstract/i-attribute-validators-factory';
import { IAttributeValidator } from '../abstract/i-attribute-validator';
import { AttributeValidatorRegistryService } from '../attribute-validator-registry.service';
import { AttributeNames } from '../../../models/constants/attribute-names';
import { AttributeValidationTypes } from '../constants/attribute-validation-types';

@Injectable({ providedIn: 'root' })

export class LinkAttributesValidatorsFactoryService implements IAttributeValidatorsFactory {

  constructor(private validators: AttributeValidatorRegistryService) { }

  getSynchronousValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {      
      case AttributeNames.linkType:
        return [this.validators.list(AttributeValidationTypes.listLinkType)]
      case AttributeNames.linkIntersect:
        return [this.validators.type(AttributeValidationTypes.typeBoolean)]
      case AttributeNames.linkVisible:
        return [this.validators.type(AttributeValidationTypes.typeBoolean)]
      default:
        return []
    }
  }

  getAsyncValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {
      case AttributeNames.linkEntity:
        return [this.validators.server(AttributeValidationTypes.serverEntity)]
      case AttributeNames.linkFromAttribute:
        return [this.validators.server(AttributeValidationTypes.serverLinkEntityAttribute)]
      case AttributeNames.linkToAttribute:
        return [this.validators.server(AttributeValidationTypes.serverParentEntityAttribute)]
      case AttributeNames.linkAlias:
        return [this.validators.string(AttributeValidationTypes.alias)]
      default:
        return []
    }
  }
}
