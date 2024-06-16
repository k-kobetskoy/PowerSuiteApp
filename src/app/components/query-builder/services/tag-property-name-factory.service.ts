import { TagPropertyNames } from './../models/constants/tag-property-names';
import { Injectable } from '@angular/core';
import { QueryNodeTags } from '../models/constants/query-node-tags';

@Injectable({ providedIn: 'root' })
export class TagPropertyNameFactoryService {

  constructor() { }

  getTagProperties(tagName: string): string[] {
    switch (tagName) {
      case QueryNodeTags.CONDITION:
        return [
          TagPropertyNames.conditionEntity,
          TagPropertyNames.conditionAttribute,
          TagPropertyNames.conditionOperator,
          TagPropertyNames.conditionValue,
          TagPropertyNames.conditionValueOf
        ];
      case QueryNodeTags.ATTRIBUTE:
        return [
          TagPropertyNames.attributeName,
          TagPropertyNames.attributeAlias,
          TagPropertyNames.attributeAggregate,
          TagPropertyNames.attributeGroupBy,
          TagPropertyNames.attributeDistinct,
          TagPropertyNames.attributeUserTimeZone,
          TagPropertyNames.attributeDateGrouping
        ]
      case QueryNodeTags.FILTER:
        return [
          TagPropertyNames.filterType,
          TagPropertyNames.filterIsQuickFind,
          TagPropertyNames.filterOverrideRecordLimit,
          TagPropertyNames.filterBypassQuickFind
        ]
      case QueryNodeTags.ENTITY:
        return [
          TagPropertyNames.entityName,
          TagPropertyNames.entityAlias
        ]
      case QueryNodeTags.LINK:
        return [
          TagPropertyNames.linkEntity,
          TagPropertyNames.linkFromAttribute,
          TagPropertyNames.linkToAttribute,
          TagPropertyNames.linkType,
          TagPropertyNames.linkAlias,
          TagPropertyNames.linkIntersect,
          TagPropertyNames.linkVisible,
          TagPropertyNames.linkShowOnlyLoolups
        ]
      case QueryNodeTags.ORDER:
        return[
          TagPropertyNames.orderAttribute,
          TagPropertyNames.orderDescending,
          TagPropertyNames.orderAlias
        ]
      case QueryNodeTags.VALUE:
        return[]
      case QueryNodeTags.ROOT:
        return[
          TagPropertyNames.rootTop,
          TagPropertyNames.rootDistinct,
          TagPropertyNames.rootAggregate,
          TagPropertyNames.rootTotalRecordsCount,
          TagPropertyNames.rootLateMaterialize,
          TagPropertyNames.rootPageSize,
          TagPropertyNames.rootPage,
          TagPropertyNames.rootPagingCookie,
          TagPropertyNames.rootDataSource,
          TagPropertyNames.rootOptions
        ]
      default:
        throw new Error(`Couldn't find node tag property names with the tag name: ${tagName}`)
    }
  }


}
