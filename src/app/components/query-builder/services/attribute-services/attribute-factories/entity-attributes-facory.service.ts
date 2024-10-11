import { Injectable } from '@angular/core';
import { IAttributeFactory } from '../abstract/i-attribute-validators-factory';
import { IAttributeValidator } from '../abstract/i-attribute-validator';
import { AttributeNames } from '../../../models/constants/attribute-names';
import { DataverseEntityTypeNames } from '../../../models/constants/dataverse-entity-type-names';
import { AttributeValidationTypes } from '../constants/attribute-validation-types';
import { AttributeValidatorRegistryService } from '../attribute-validator-registry.service';
import { IQueryNode } from '../../../models/abstract/i-query-node';
import { NodeAttribute } from '../../../models/node-attribute';
import { AttributeValidators } from '../../../models/attribute-validators';
import { AttributeTreeViewDisplayStyle } from '../../../models/constants/attribute-tree-view-display-style';

@Injectable({ providedIn: 'root' })

export class EntityAttributesFacoryService implements IAttributeFactory {

  constructor(private validators: AttributeValidatorRegistryService) { }

  getAttribute(attributeName: string, node: IQueryNode, parserValidation: boolean, value?: string): NodeAttribute {
    
    const validators: AttributeValidators = this.getAttributeValidators(attributeName, parserValidation);

    switch (attributeName) {
      case AttributeNames.entityName:
        return new NodeAttribute(node, attributeName, validators, 'Entity', AttributeTreeViewDisplayStyle.onlyValue, value, 1);
      case AttributeNames.entityAlias:
        return new NodeAttribute(node, attributeName, validators, 'Alias', AttributeTreeViewDisplayStyle.alias, value, 2);
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
    return []
  }

  private getParserAsyncValidators(attributeName: string): IAttributeValidator[] {
    return []
  }

  private getDefaultAsyncValidators(attributeName: string): IAttributeValidator[] {
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
