import { AttributeValidationTypes } from '../constants/attribute-validation-types';
import { AttributeValidatorRegistryService } from '../attribute-validator-registry.service';
import { Injectable } from '@angular/core';
import { IAttributeFactory } from '../abstract/i-attribute-validators-factory';
import { IAttributeValidator } from '../abstract/i-attribute-validator';
import { AttributeNames } from '../../../models/constants/attribute-names';
import { AttributeValueTypes } from '../../../models/constants/attribute-value-types';
import { IQueryNode } from '../../../models/abstract/i-query-node';
import { NodeAttribute } from '../../../models/node-attribute';
import { AttributeTreeViewDisplayStyle } from '../../../models/constants/attribute-tree-view-display-style';
import { AttributeValidators } from '../../../models/attribute-validators';

@Injectable({ providedIn: 'root' })

export class AttributeAttributesFactoryService implements IAttributeFactory {

  constructor(private validators: AttributeValidatorRegistryService) { }
  
  getAttribute(attributeName: string, node: IQueryNode, parserValidation: boolean, value?: string): NodeAttribute {
    
    const validators: AttributeValidators = this.getAttributeValidators(attributeName, parserValidation);

    switch (attributeName) {
      case AttributeNames.attributeName:
        return new NodeAttribute(node, attributeName, validators, 'AttributeName', AttributeTreeViewDisplayStyle.onlyValue, value);
      case AttributeNames.attributeAlias:
        return new NodeAttribute(node, attributeName, validators, 'Alias', AttributeTreeViewDisplayStyle.alias, value);
      case AttributeNames.attributeAggregate:
        return new NodeAttribute(node, attributeName, validators, 'Agg', AttributeTreeViewDisplayStyle.nameWithValue, value);
      case AttributeNames.attributeGroupBy:
        return new NodeAttribute(node, attributeName, validators, 'GrpBy', AttributeTreeViewDisplayStyle.onlyName, value);
      case AttributeNames.attributeDistinct:
      case AttributeNames.attributeUserTimeZone:
      case AttributeNames.attributeDateGrouping:
        return new NodeAttribute(node, attributeName, validators, null, null, value);      
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

  private getParserAsyncValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {
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

  private getDefaultAsyncValidators(attributeName: string): IAttributeValidator[] {
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
