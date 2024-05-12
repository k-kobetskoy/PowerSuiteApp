import { Injectable } from '@angular/core';
import { NotImplementError } from 'src/app/models/errors/not-implement-error';
import { QueryNodeType } from '../models/constants/query-node-type';
import { ITagProperties } from '../models/abstract/i-tag-properties';
import { TagPropertyCondition } from '../models/tag-properties/tag-property-condition';
import { TagPropertyEntityAttribute } from '../models/tag-properties/tag-property-entity-attribute';
import { TagPropertyFilter } from '../models/tag-properties/tag-property-filter';
import { TagPropertyEntity } from '../models/tag-properties/tag-property-entity';
import { TagPropertyLink } from '../models/tag-properties/tag-property-link';
import { TagPropertyOrder } from '../models/tag-properties/tag-property-order';
import { TagPropertyConditionValue } from '../models/tag-properties/tag-property-condition-value';
import { TagPropertyRoot } from '../models/tag-properties/tag-property-root';

@Injectable({ providedIn: 'root' })
export class TagPropertiesFactoryService {

  constructor() { }

  getTagProperties(typeName: string): ITagProperties {
    switch (typeName) {
      case QueryNodeType.CONDITION:
        return new TagPropertyCondition()
      case QueryNodeType.ATTRIBUTE:
        return new TagPropertyEntityAttribute()
      case QueryNodeType.FILTER:
        return new TagPropertyFilter()
      case QueryNodeType.ENTITY:
        return new TagPropertyEntity()
      case QueryNodeType.LINK:
        return new TagPropertyLink()
      case QueryNodeType.ORDER:
        return new TagPropertyOrder()
      case QueryNodeType.VALUE:
        return new TagPropertyConditionValue()
      case QueryNodeType.ROOT:
        return new TagPropertyRoot()
      default:
        throw new NotImplementError(`Couldn't find node type with the name: ${typeName}`)
    }
  }

}
