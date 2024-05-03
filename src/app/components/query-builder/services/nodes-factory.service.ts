import { Injectable } from '@angular/core';
import { QueryNodeOrder } from 'src/app/components/query-builder/models/constants/query-node-order.enum';
import { QueryNodeType } from 'src/app/components/query-builder/models/constants/query-node-type';
import { NotImplementError } from 'src/app/models/errors/not-implement-error';
import { QueryNode } from 'src/app/components/query-builder/models/query-node';
import { QueryNodeNames } from 'src/app/components/query-builder/models/constants/query-node-names';
import { IQueryNode } from 'src/app/components/query-builder/models/abstract/i-query-node';
import { QueryNodeActions } from '../models/constants/query-node-actions';


@Injectable({ providedIn: 'root' })
export class NodeFactoryService {

  constructor() { }

  getNodeWithBaseFields(typeName: string): IQueryNode {
    switch (typeName) {
      case QueryNodeType.CONDITION:
        return new QueryNode(
          QueryNodeNames.CONDITION,
          QueryNodeType.CONDITION,
          QueryNodeOrder.condition,
          QueryNodeActions.CONDITION
        )
      case QueryNodeType.ATTRIBUTE:
        return new QueryNode(
          QueryNodeNames.ATTRIBUTE,
          QueryNodeType.ATTRIBUTE,
          QueryNodeOrder.attribute,
          QueryNodeActions.ATTRIBUTE
        )
      case QueryNodeType.FILTER:
        return new QueryNode(
          QueryNodeNames.FILTER,
          QueryNodeType.FILTER,
          QueryNodeOrder.filter,
          QueryNodeActions.FILTER
        )
      case QueryNodeType.ENTITY:
        return new QueryNode(
          QueryNodeNames.ENTITY,
          QueryNodeType.ENTITY,
          QueryNodeOrder.entity,
          QueryNodeActions.ENTITY
        )
      case QueryNodeType.LINK:
        return new QueryNode(
          QueryNodeNames.LINK,
          QueryNodeType.LINK,
          QueryNodeOrder.link,
          QueryNodeActions.LINK
        )
      case QueryNodeType.ORDER:
        return new QueryNode(
          QueryNodeNames.ORDER,
          QueryNodeType.ORDER,
          QueryNodeOrder.order,
          QueryNodeActions.ORDER
        )
      case QueryNodeType.VALUE:
        return new QueryNode(
          QueryNodeNames.VALUE,
          QueryNodeType.VALUE,
          QueryNodeOrder.value,
          QueryNodeActions.VALUE
        )
      case QueryNodeType.ROOT:
        return new QueryNode(
          QueryNodeNames.ROOT,
          QueryNodeType.ROOT,
          QueryNodeOrder.root, 
          QueryNodeActions.ROOT,
          false,
          true
        )
      default:
        throw new NotImplementError(`Couldn't find node type with the name: ${typeName}`)
    }
  }
}
