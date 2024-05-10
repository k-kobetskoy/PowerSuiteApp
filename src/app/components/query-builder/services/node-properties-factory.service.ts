import { Injectable } from '@angular/core';
import { NotImplementError } from 'src/app/models/errors/not-implement-error';
import { QueryNodeType } from '../models/constants/query-node-type';
import { INodeProperty } from '../models/abstract/i-node-property';
import { NodePropertyCondition } from '../models/node-properties/node-property-condition';
import { NodePropertyEntityAttribute } from '../models/node-properties/node-property-entity-attribute';
import { NodePropertyFilter } from '../models/node-properties/node-property-filter';
import { NodePropertyEntity } from '../models/node-properties/node-property-entity';
import { NodePropertyLink } from '../models/node-properties/node-property-link';
import { NodePropertySort } from '../models/node-properties/node-property-sort';
import { NodePropertyConditionValue } from '../models/node-properties/node-property-condition-value';
import { NodePropertyRoot } from '../models/node-properties/node-property-root';

@Injectable({ providedIn: 'root' })
export class NodePropertiesFactoryService {

  constructor() { }

  getNodeProperty(typeName: string): INodeProperty {
    switch (typeName) {
      case QueryNodeType.CONDITION:
        return new NodePropertyCondition()
      case QueryNodeType.ATTRIBUTE:
        return new NodePropertyEntityAttribute()
      case QueryNodeType.FILTER:
        return new NodePropertyFilter()
      case QueryNodeType.ENTITY:
        return new NodePropertyEntity()
      case QueryNodeType.LINK:
        return new NodePropertyLink()
      case QueryNodeType.ORDER:
        return new NodePropertySort()
      case QueryNodeType.VALUE:
        return new NodePropertyConditionValue()
      case QueryNodeType.ROOT:
        return new NodePropertyRoot()
      default:
        throw new NotImplementError(`Couldn't find node type with the name: ${typeName}`)
    }
  }

}
