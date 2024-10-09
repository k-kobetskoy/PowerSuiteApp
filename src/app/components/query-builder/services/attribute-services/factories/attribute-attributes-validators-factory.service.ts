import { AttributeValidationTypes } from './../constants/attribute-validation-types';
import { AttributeValidatorRegistryService } from './../attribute-validator-registry.service';
import { Attribute, Injectable } from '@angular/core';
import { IAttributeValidatorsFactory } from '../abstract/i-attribute-validators-factory';
import { IAttributeValidator } from '../abstract/i-attribute-validator';
import { AttributeNames } from '../../../models/constants/attribute-names';
import { DataverseEntityTypeNames } from '../../../models/constants/dataverse-entity-type-names';
import { AttributeValueTypes } from '../../../models/constants/attribute-value-types';

@Injectable({ providedIn: 'root' })

export class AttributeAttributesValidatorsFactoryService implements IAttributeValidatorsFactory {

  constructor(private validators: AttributeValidatorRegistryService) { }

  getSynchronousValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {
      case AttributeNames.attributeAggregate:
        return [
          this.validators.list(AttributeValidationTypes.attributeAggregateList)
        ]
      case AttributeNames.attributeGroupBy:
        return [
          this.validators.type(AttributeValueTypes.boolean)
        ]
      case AttributeNames.attributeDistinct:
        return [
          this.validators.type(AttributeValueTypes.boolean)
        ]
      case AttributeNames.attributeUserTimeZone:
        return [
          this.validators.type(AttributeValueTypes.boolean)
        ]
      case AttributeNames.attributeDateGrouping:
        return [
          this.validators.list(AttributeValidationTypes.attributeDateGrouping)
        ]
      default:
        return []
    }
  }

  getAsyncValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {
      case AttributeNames.attributeName:
        return [
          this.validators.server(AttributeValidationTypes.serverParentEntityAttribute)
        ];
      case AttributeNames.attributeAlias:
        return [
          this.validators.string(AttributeValidationTypes.alias)
        ]
      case AttributeNames.attributeAggregate:
        return [
          this.validators.condition(AttributeValidationTypes.attributeFetchAggregateTure),
        ]
      case AttributeNames.attributeGroupBy:
        return [
          this.validators.condition(AttributeValidationTypes.attributeFetchAggregateTure),
          this.validators.condition(AttributeValidationTypes.attributeDistinctFalse),
        ]
      case AttributeNames.attributeDistinct:
        return [
          this.validators.condition(AttributeValidationTypes.attributeFetchAggregateTure),
          this.validators.condition(AttributeValidationTypes.attributeGroupByFalse),
        ]
      case AttributeNames.attributeUserTimeZone:
        return [
          this.validators.condition(AttributeValidationTypes.attributeFetchAggregateTure),
          this.validators.condition(AttributeValidationTypes.attributeGroupByTrue),
        ]
      case AttributeNames.attributeDateGrouping:
        return [
          this.validators.condition(AttributeValidationTypes.attributeFetchAggregateTure),
          this.validators.condition(AttributeValidationTypes.attributeGroupByTrue),
        ]
      default:
        return []
    }
  }
}
