import { Injectable } from '@angular/core';
import { QueryNodeType } from 'src/app/components/query-builder/models/constants/query-node-type';
import { NotImplementError } from 'src/app/models/errors/not-implement-error';
import { IQueryNode } from 'src/app/components/query-builder/models/abstract/i-query-node';
import { NodeCondition } from '../models/nodes/node-condition';
import { NodePropertiesFactoryService } from './node-properties-factory.service';
import { NodeRoot } from '../models/nodes/node-root';
import { NodeConditionValue } from '../models/nodes/node-condition-value';
import { NodeSort } from '../models/nodes/node-sort';
import { NodeLink } from '../models/nodes/node-link';
import { NodeEntity } from '../models/nodes/node-entity';
import { NodeFilter } from '../models/nodes/node-filter';
import { NodeEntityAttribute } from '../models/nodes/node-entity-attribute';


@Injectable({ providedIn: 'root' })
export class NodeFactoryService {

  constructor(private nodePropertiesFactory: NodePropertiesFactoryService) { }

  getNode(typeName: string): IQueryNode {
    switch (typeName) {
      case QueryNodeType.CONDITION:
        return new NodeCondition(this.nodePropertiesFactory.getNodeProperty(QueryNodeType.CONDITION))
      case QueryNodeType.ATTRIBUTE:
        return new NodeEntityAttribute(this.nodePropertiesFactory.getNodeProperty(QueryNodeType.ATTRIBUTE))
      case QueryNodeType.FILTER:
        return new NodeFilter(this.nodePropertiesFactory.getNodeProperty(QueryNodeType.FILTER))
      case QueryNodeType.ENTITY:
        return new NodeEntity(this.nodePropertiesFactory.getNodeProperty(QueryNodeType.ENTITY))
      case QueryNodeType.LINK:
        return new NodeLink(this.nodePropertiesFactory.getNodeProperty(QueryNodeType.LINK))
      case QueryNodeType.ORDER:
        return new NodeSort(this.nodePropertiesFactory.getNodeProperty(QueryNodeType.ORDER))
      case QueryNodeType.VALUE:
        return new NodeConditionValue(this.nodePropertiesFactory.getNodeProperty(QueryNodeType.VALUE))
      case QueryNodeType.ROOT:
        return new NodeRoot(this.nodePropertiesFactory.getNodeProperty(QueryNodeType.ROOT))
      default:
        throw new NotImplementError(`Couldn't find node type with the name: ${typeName}`)
    }
  }
}
