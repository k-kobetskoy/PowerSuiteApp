import { Injectable } from '@angular/core';
import { FetchNodeOrder } from 'src/app/config/fetch-node-order.enum';
import { FetchNodeType } from 'src/app/config/fetch-node-type';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';

@Injectable({
  providedIn: 'root'
})
export class NodeFactoryService {

  constructor() { }

  getNodeWithBaseFields(typeName: string): FetchNode {
    switch (typeName) {
      case FetchNodeType.condition:
        return new FetchNode(
          '(condition)',
          FetchNodeOrder.condition,
          FetchNodeType.condition,
          true,
          false)
      case FetchNodeType.attribute:
        return new FetchNode(
          '(attribute)',
          FetchNodeOrder.attribute,
          FetchNodeType.attribute,
          true,
          false)
      case FetchNodeType.filter:
        return new FetchNode(
          '(filter)',
          FetchNodeOrder.filter,
          FetchNodeType.filter,
          true,
          false)
      case FetchNodeType.entity:
        return new FetchNode(
          '(entity)',
          FetchNodeOrder.entity,
          FetchNodeType.entity,
          true,
          false)
      case FetchNodeType.link:
        return new FetchNode(
          '(link entity)',
          FetchNodeOrder.link,
          FetchNodeType.link,
          true,
          false)
      case FetchNodeType.order:
        return new FetchNode(
          '(order)',
          FetchNodeOrder.order,
          FetchNodeType.order,
          true,
          false)
      case FetchNodeType.value:
        return new FetchNode(
          '(value)',
          FetchNodeOrder.value,
          FetchNodeType.value,
          true,
          false)
      case FetchNodeType.root:
        return new FetchNode(
          'Root',
          FetchNodeOrder.root,
          FetchNodeType.root,
          false,
          true)
      default:
        throw new Error(`Couldn't find node type with the name: ${typeName}`)
    }
  }
}
