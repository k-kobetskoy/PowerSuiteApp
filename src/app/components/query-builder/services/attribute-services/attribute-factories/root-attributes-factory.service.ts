import { AttributeValidators } from '../../../models/attribute-validators';
import { AttributeValidationTypes } from '../constants/attribute-validation-types';
import { Injectable } from '@angular/core';
import { IAttributeValidator } from '../abstract/i-attribute-validator';
import { IAttributeFactory } from '../abstract/i-attribute-validators-factory';
import { AttributeValidatorRegistryService } from '../attribute-validator-registry.service';
import { AttributeNames } from '../../../models/constants/attribute-names';
import { NodeAttribute } from '../../../models/node-attribute';
import { IQueryNode } from '../../../models/abstract/i-query-node';
import { AttributeTreeViewDisplayStyle } from '../../../models/constants/attribute-tree-view-display-style';

@Injectable({ providedIn: 'root' })

export class RootAttributesFactoryService implements IAttributeFactory {

  constructor(private validators: AttributeValidatorRegistryService) { }

  getAttribute(attributeName: string, node: IQueryNode, parserValidation: boolean, value?: string): NodeAttribute {

    const validators: AttributeValidators = this.getAttributeValidators(attributeName, parserValidation);

    switch (attributeName) {
      case AttributeNames.rootTop:
        return new NodeAttribute(node, attributeName, validators, 'Top', AttributeTreeViewDisplayStyle.nameWithValue, value, 1);
      case AttributeNames.rootDistinct:
        return new NodeAttribute(node, attributeName, validators, 'Dst', AttributeTreeViewDisplayStyle.onlyName, value, 5);
      case AttributeNames.rootAggregate:
        return new NodeAttribute(node, attributeName, validators, 'Agg', AttributeTreeViewDisplayStyle.onlyName, value, 4);
      case AttributeNames.rootTotalRecordsCount:
        return new NodeAttribute(node, attributeName, validators, 'Trc', AttributeTreeViewDisplayStyle.onlyName, value, 3);
      case AttributeNames.rootRecordsPerPage:
        return new NodeAttribute(node, attributeName, validators, 'Cnt', AttributeTreeViewDisplayStyle.nameWithValue, value, 2);
      case AttributeNames.rootPage:
        return new NodeAttribute(node, attributeName, validators, 'Pg', AttributeTreeViewDisplayStyle.nameWithValue, value, 6);
      case AttributeNames.rootPagingCookie:
      case AttributeNames.rootLateMaterialize:
      case AttributeNames.rootDataSource:
      case AttributeNames.rootOptions:
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

  private getDefaultAsyncValidators(attributeName: string): IAttributeValidator[] {
    return [];
  }

  private getParserAsyncValidators(attributeName: string): IAttributeValidator[] {
    return [];
  }

  private getParserSynchronousValidators(attributeName: string): IAttributeValidator[] {
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
}