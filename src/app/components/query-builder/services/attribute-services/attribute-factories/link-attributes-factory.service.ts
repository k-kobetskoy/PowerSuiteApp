import { Injectable } from '@angular/core';
import { IAttributeFactory } from '../abstract/i-attribute-validators-factory';
import { IAttributeValidator } from '../abstract/i-attribute-validator';
import { AttributeValidatorRegistryService } from '../attribute-validator-registry.service';
import { AttributeNames } from '../../../models/constants/attribute-names';
import { AttributeValidationTypes } from '../constants/attribute-validation-types';
import { IQueryNode } from '../../../models/abstract/i-query-node';
import { NodeAttribute } from '../../../models/node-attribute';
import { AttributeValidators } from '../../../models/attribute-validators';
import { AttributeTreeViewDisplayStyle } from '../../../models/constants/attribute-tree-view-display-style';

@Injectable({ providedIn: 'root' })

export class LinkAttributesFactoryService implements IAttributeFactory {

  constructor(private validators: AttributeValidatorRegistryService) { }

  getAttribute(attributeName: string, node: IQueryNode, parserValidation: boolean, value?: string): NodeAttribute {

    const validators: AttributeValidators = this.getAttributeValidators(attributeName, parserValidation);

    switch (attributeName) {
      case AttributeNames.linkEntity:
        return new NodeAttribute(node, attributeName, validators, 'LinkEntity', AttributeTreeViewDisplayStyle.onlyValue, value, 1);
      case AttributeNames.linkAlias:
        return new NodeAttribute(node, attributeName, validators, 'LinkAlias', AttributeTreeViewDisplayStyle.alias, value, 2);
      case AttributeNames.linkIntersect:
        return new NodeAttribute(node, attributeName, validators, 'M:M', AttributeTreeViewDisplayStyle.onlyName, value, 4);
      case AttributeNames.linkType:
        return new NodeAttribute(node, attributeName, validators, 'LinkType', AttributeTreeViewDisplayStyle.onlyValue, value, 3);
      case AttributeNames.linkFromAttribute:
      case AttributeNames.linkToAttribute:
      case AttributeNames.linkVisible:
      case AttributeNames.linkShowOnlyLoolups:
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

  private getParserAsyncValidators(attributeName: string): IAttributeValidator[] {
    return []
  }

  private getParserSynchronousValidators(attributeName: string): IAttributeValidator[] {
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

  getDefaultAsyncValidators(attributeName: string): IAttributeValidator[] {
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
