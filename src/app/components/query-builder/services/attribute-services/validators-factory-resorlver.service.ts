import { ConditionAttributesValidatorsFactoryService } from './factories/condition-attributes-validators-factory.service';
import { Injectable } from '@angular/core';
import { RootAttributesValidatorsFactoryService } from './factories/root-attributes-validators-factory.service';
import { EntityAttributesValidatorsFacoryService } from './factories/entity-attributes-validators-facory.service';
import { IAttributeValidatorsFactory } from './abstract/i-attribute-validators-factory';
import { AttributeAttributesValidatorsFactoryService } from './factories/attribute-attributes-validators-factory.service';
import { FilterAttributesValidatorsFactoryService } from './factories/filter-attributes-validators-factory.service';
import { LinkAttributesValidatorsFactoryService } from './factories/link-attributes-validators-factory.service';
import { OrderAttributesValidatorsFactoryService } from './factories/order-attributes-validators-factory.service';
import { QueryNodeType } from '../../models/constants/query-node-type';

@Injectable({ providedIn: 'root' })

export class ValidatorsFactoryResorlverService {

  constructor(
    private rootValidatorFactory: RootAttributesValidatorsFactoryService,
    private entityValidatorFactory: EntityAttributesValidatorsFacoryService,
    private conditionValidatorFactory: ConditionAttributesValidatorsFactoryService,
    private attributeValidatorFactory: AttributeAttributesValidatorsFactoryService,
    private filterValidatorFactory: FilterAttributesValidatorsFactoryService,
    private linkValidatorFactory: LinkAttributesValidatorsFactoryService,
    private orderValidatorFactory: OrderAttributesValidatorsFactoryService,
  ) { }

  getValidatorsFactory(tagName: string): IAttributeValidatorsFactory {
    switch (tagName) {
      case QueryNodeType.CONDITION:
        return this.conditionValidatorFactory
      case QueryNodeType.ATTRIBUTE:
        return this.attributeValidatorFactory
      case QueryNodeType.FILTER:
        return this.filterValidatorFactory
      case QueryNodeType.ENTITY:
        return this.entityValidatorFactory
      case QueryNodeType.LINK:
        return this.linkValidatorFactory
      case QueryNodeType.ORDER:
        return this.orderValidatorFactory
      case QueryNodeType.ROOT:
        return this.rootValidatorFactory
      default:
        return null;
    }
  }
}
