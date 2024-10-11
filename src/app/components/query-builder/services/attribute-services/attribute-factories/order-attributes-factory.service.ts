import { Injectable } from '@angular/core';
import { IAttributeFactory } from '../abstract/i-attribute-validators-factory';
import { IAttributeValidator } from '../abstract/i-attribute-validator';
import { AttributeNames } from '../../../models/constants/attribute-names';
import { AttributeValidationTypes } from '../constants/attribute-validation-types';
import { AttributeValidatorRegistryService } from '../attribute-validator-registry.service';
import { IQueryNode } from '../../../models/abstract/i-query-node';
import { NodeAttribute } from '../../../models/node-attribute';
import { AttributeValidators } from '../../../models/attribute-validators';
import { AttributeTreeViewDisplayStyle } from '../../../models/constants/attribute-tree-view-display-style';

@Injectable({ providedIn: 'root' })

export class OrderAttributesFactoryService implements IAttributeFactory {

  constructor(private validators: AttributeValidatorRegistryService) { }

  getAttribute(attributeName: string, node: IQueryNode, parserValidation: boolean, value?: string): NodeAttribute {

    const validators: AttributeValidators = this.getAttributeValidators(attributeName, parserValidation);

    switch (attributeName) {
      case AttributeNames.orderAttribute:
        return new NodeAttribute(node, attributeName, validators, 'OrderAttribute', AttributeTreeViewDisplayStyle.onlyValue, value, 1);
      case AttributeNames.orderAlias:
        return new NodeAttribute(node, attributeName, validators, 'OrderAlias', AttributeTreeViewDisplayStyle.alias, value, 2);
      case AttributeNames.orderDescending:
        return new NodeAttribute(node, attributeName, validators, 'Desc', AttributeTreeViewDisplayStyle.onlyName, value, 3);
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
      case AttributeNames.orderDescending:
        return [this.validators.type(AttributeValidationTypes.typeBoolean)]
      default:
        return []
    }
  }

  private getParserAsyncValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {
      case AttributeNames.orderAttribute:
        return [this.validators.condition(AttributeValidationTypes.orderFetchAggregateFalse)]
      default:
        return []
    }
  }

  private getDefaultAsyncValidators(attributeName: string): IAttributeValidator[] {
    switch (attributeName) {
      case AttributeNames.orderAttribute:
        return [this.validators.server(AttributeValidationTypes.serverParentEntityAttribute)]
      case AttributeNames.orderAlias:
        return [this.validators.string(AttributeValidationTypes.alias)]
      default:
        return []
    }
  }
}
