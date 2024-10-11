import { ConditionAttributesFactoryService } from './attribute-factories/condition-attributes-factory.service';
import { Injectable } from '@angular/core';
import { RootAttributesFactoryService } from './attribute-factories/root-attributes-factory.service';
import { EntityAttributesFacoryService } from './attribute-factories/entity-attributes-facory.service';
import { IAttributeFactory } from './abstract/i-attribute-validators-factory';
import { AttributeAttributesFactoryService } from './attribute-factories/attribute-attributes-factory.service';
import { FilterAttributesFactoryService } from './attribute-factories/filter-attributes-factory.service';
import { LinkAttributesFactoryService } from './attribute-factories/link-attributes-factory.service';
import { OrderAttributesFactoryService } from './attribute-factories/order-attributes-factory.service';
import { QueryNodeType } from '../../models/constants/query-node-type';

@Injectable({ providedIn: 'root' })

export class AttributeFactoryResorlverService {

  constructor(
    private rootFactory: RootAttributesFactoryService,
    private entityFactory: EntityAttributesFacoryService,
    private conditionFactory: ConditionAttributesFactoryService,
    private attributeFactory: AttributeAttributesFactoryService,
    private filterFactory: FilterAttributesFactoryService,
    private linkFactory: LinkAttributesFactoryService,
    private orderFactory: OrderAttributesFactoryService,
  ) { }

  getValidatorsFactory(tagName: string): IAttributeFactory {
    switch (tagName) {
      case QueryNodeType.CONDITION:
        return this.conditionFactory
      case QueryNodeType.ATTRIBUTE:
        return this.attributeFactory
      case QueryNodeType.FILTER:
        return this.filterFactory
      case QueryNodeType.ENTITY:
        return this.entityFactory
      case QueryNodeType.LINK:
        return this.linkFactory
      case QueryNodeType.ORDER:
        return this.orderFactory
      case QueryNodeType.ROOT:
        return this.rootFactory
      default:
        return null;
    }
  }
}
