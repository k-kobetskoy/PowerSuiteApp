import { Injectable } from '@angular/core';
import { FetchNodeOrder } from 'src/app/config/fetch-node-order.enum';
import { FetchNodeType } from 'src/app/config/fetch-node-type';
import { NotImplementError } from 'src/app/models/errors/not-implement-error';
import { QueryNode } from 'src/app/models/query-builder/query-node';

@Injectable({
  providedIn: 'root'
})
export class NodeFactoryService {

  constructor() { }

  getNodeWithBaseFields(typeName: string): QueryNode {
    switch (typeName) {
      case FetchNodeType.condition:
        return new QueryNode(
          '(condition)',
          FetchNodeOrder.condition,
          FetchNodeType.condition,
          true,
          false)
      case FetchNodeType.attribute:
        return new QueryNode(
          '(attribute)',
          FetchNodeOrder.attribute,
          FetchNodeType.attribute,
          true,
          false)
      case FetchNodeType.filter:
        return new QueryNode(
          '(filter)',
          FetchNodeOrder.filter,
          FetchNodeType.filter,
          true,
          false)
      case FetchNodeType.entity:
        return new QueryNode(
          '(entity)',
          FetchNodeOrder.entity,
          FetchNodeType.entity,
          true,
          false)
      case FetchNodeType.link:
        return new QueryNode(
          '(link entity)',
          FetchNodeOrder.link,
          FetchNodeType.link,
          true,
          false)
      case FetchNodeType.order:
        return new QueryNode(
          '(order)',
          FetchNodeOrder.order,
          FetchNodeType.order,
          true,
          false)
      case FetchNodeType.value:
        return new QueryNode(
          '(value)',
          FetchNodeOrder.value,
          FetchNodeType.value,
          true,
          false)
      case FetchNodeType.root:
        return new QueryNode(
          'Root',
          FetchNodeOrder.root,
          FetchNodeType.root,
          false,
          true)
      default:
        throw new NotImplementError(`Couldn't find node type with the name: ${typeName}`)
    }
  }
}
