import { Injectable } from '@angular/core';
import { QueryNodeType } from 'src/app/components/query-builder/models/constants/query-node-type';
import { NotImplementError } from 'src/app/models/errors/not-implement-error';
import { IQueryNode } from 'src/app/components/query-builder/models/abstract/i-query-node';
import { QueryNode } from '../models/query-node';
import { QueryNodeOrder } from '../models/constants/query-node-order.enum';
import { QueryNodeActions } from '../models/constants/query-node-actions';
import { QueryNodeTags } from '../models/constants/query-node-tags';
import { TagPropertiesFactoryService } from './tag-properties-factory.service';

@Injectable({ providedIn: 'root' })
export class NodeFactoryService {

  constructor(private tagPropertiesFactory :TagPropertiesFactoryService) { }

  getNode(typeName: string): IQueryNode {
    switch (typeName) {
      case QueryNodeType.CONDITION:
        return new QueryNode({ 
          tagProperties: this.tagPropertiesFactory.getTagProperties(QueryNodeType.CONDITION),
          defaultDisplayValue: QueryNodeType.CONDITION,
          displayValue: QueryNodeType.CONDITION,
          order: QueryNodeOrder.CONDITION,
          type: QueryNodeType.CONDITION,
          actions: QueryNodeActions.CONDITION
        })
      case QueryNodeType.ATTRIBUTE:
        return new QueryNode({
          tagProperties: this.tagPropertiesFactory.getTagProperties(QueryNodeType.ATTRIBUTE),
          defaultDisplayValue: QueryNodeType.ATTRIBUTE,
          displayValue: QueryNodeType.ATTRIBUTE,
          order: QueryNodeOrder.ATTRIBUTE,
          type: QueryNodeType.ATTRIBUTE,
          actions: QueryNodeActions.ATTRIBUTE
        })
      case QueryNodeType.FILTER:
        return new QueryNode({
          tagProperties: this.tagPropertiesFactory.getTagProperties(QueryNodeType.FILTER),
          defaultDisplayValue: QueryNodeType.FILTER,
          displayValue: QueryNodeType.FILTER,
          order: QueryNodeOrder.FILTER,
          type: QueryNodeType.FILTER,
          actions: QueryNodeActions.FILTER
        })
      case QueryNodeType.ENTITY:
        return new QueryNode({
          tagProperties: this.tagPropertiesFactory.getTagProperties(QueryNodeType.ENTITY),
          defaultDisplayValue: QueryNodeType.ENTITY,
          displayValue: QueryNodeType.ENTITY,
          order: QueryNodeOrder.ENTITY,
          type: QueryNodeType.ENTITY,
          actions: QueryNodeActions.ENTITY
        })
      case QueryNodeType.LINK:
        return new QueryNode({
          tagProperties: this.tagPropertiesFactory.getTagProperties(QueryNodeType.LINK),
          defaultDisplayValue: QueryNodeType.LINK,
          displayValue: QueryNodeType.LINK,
          order: QueryNodeOrder.LINK,
          type: QueryNodeType.LINK,
          actions: QueryNodeActions.LINK
        })
      case QueryNodeType.ORDER:
        return new QueryNode({
          tagProperties: this.tagPropertiesFactory.getTagProperties(QueryNodeType.ORDER),
          defaultDisplayValue: QueryNodeType.ORDER,
          displayValue: QueryNodeType.ORDER,
          order: QueryNodeOrder.ORDER,
          type: QueryNodeType.ORDER,
          actions: QueryNodeActions.ORDER
        })
      case QueryNodeType.VALUE:
        return new QueryNode({
          tagProperties: this.tagPropertiesFactory.getTagProperties(QueryNodeType.VALUE),
          defaultDisplayValue: QueryNodeType.VALUE,
          displayValue: QueryNodeType.VALUE,
          order: QueryNodeOrder.VALUE,
          type: QueryNodeType.VALUE,
          actions: QueryNodeActions.VALUE
        })
      case QueryNodeType.ROOT:
        return new QueryNode({ 
          tagProperties: this.tagPropertiesFactory.getTagProperties(QueryNodeType.ROOT),
          defaultDisplayValue: QueryNodeType.ROOT,
          displayValue: QueryNodeType.ROOT,
          order: QueryNodeOrder.ROOT,
          type: QueryNodeType.ROOT,
          actions: QueryNodeActions.ROOT
        })
      default:
        throw new NotImplementError(`Couldn't find node type with the name: ${typeName}`)
    }
  }
}
