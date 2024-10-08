import { Injectable } from '@angular/core';
import { QueryNodeType } from 'src/app/components/query-builder/models/constants/query-node-type';
import { NotImplementError } from 'src/app/models/errors/not-implement-error';
import { IQueryNode } from 'src/app/components/query-builder/models/abstract/i-query-node';
import { TagPropertiesFactoryService } from './tag-properties-factory.service';
import { NodeCondition } from '../models/nodes/node-condition';
import { NodeEntityAttribute } from '../models/nodes/node-entity-attribute';
import { NodeFilter } from '../models/nodes/node-filter';
import { NodeEntity } from '../models/nodes/node-entity';
import { NodeLink } from '../models/nodes/node-link';
import { NodeOrder } from '../models/nodes/node-order';
import { NodeConditionValue } from '../models/nodes/node-condition-value';
import { NodeRoot } from '../models/nodes/node-root';
import { EntityServiceFactoryService } from './entity-service-factory.service';

@Injectable({ providedIn: 'root' })
export class NodeFactoryService {

  constructor(private tagPropertiesFactory: TagPropertiesFactoryService, private entityServiceFactory: EntityServiceFactoryService) { }

  getNode(typeName: string): IQueryNode {
    switch (typeName) {
      case QueryNodeType.CONDITION:
        return new NodeCondition(this.tagPropertiesFactory.getTagProperties(QueryNodeType.CONDITION), this.entityServiceFactory)
      case QueryNodeType.ATTRIBUTE:
        return new NodeEntityAttribute(this.tagPropertiesFactory.getTagProperties(QueryNodeType.ATTRIBUTE), this.entityServiceFactory)
      case QueryNodeType.FILTER:
        return new NodeFilter(this.tagPropertiesFactory.getTagProperties(QueryNodeType.FILTER), this.entityServiceFactory)
      case QueryNodeType.ENTITY:
        return new NodeEntity(this.tagPropertiesFactory.getTagProperties(QueryNodeType.ENTITY), this.entityServiceFactory)
      case QueryNodeType.LINK:
        return new NodeLink(this.tagPropertiesFactory.getTagProperties(QueryNodeType.LINK), this.entityServiceFactory)
      case QueryNodeType.ORDER:
        return new NodeOrder(this.tagPropertiesFactory.getTagProperties(QueryNodeType.ORDER), this.entityServiceFactory)
      case QueryNodeType.VALUE:
        return new NodeConditionValue(this.tagPropertiesFactory.getTagProperties(QueryNodeType.VALUE), this.entityServiceFactory)
      case QueryNodeType.ROOT:
        return new NodeRoot(this.tagPropertiesFactory.getTagProperties(QueryNodeType.ROOT), this.entityServiceFactory)
      default:
        throw new NotImplementError(`Couldn't find node type with the name: ${typeName}`)
    }
  }
}
