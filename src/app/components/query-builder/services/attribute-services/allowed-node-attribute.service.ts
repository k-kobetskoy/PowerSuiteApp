import { AttributeNames as AttributesNames } from '../../models/constants/attribute-names';
import { Injectable } from '@angular/core';
import { QueryNodeTags } from '../../models/constants/query-node-tags';

@Injectable({ providedIn: 'root' })
export class AllowedNodeAttributeService {

  constructor() { }

  getAllowedNodeAttributes(tagName: string): string[] {
    switch (tagName) {
      case QueryNodeTags.CONDITION:
        return [
          AttributesNames.conditionEntity,
          AttributesNames.conditionAttribute,
          AttributesNames.conditionOperator,
          AttributesNames.conditionValue,
          AttributesNames.conditionValueOf
        ];
      case QueryNodeTags.ATTRIBUTE:
        return [
          AttributesNames.attributeName,
          AttributesNames.attributeAlias,
          AttributesNames.attributeAggregate,
          AttributesNames.attributeGroupBy,
          AttributesNames.attributeDistinct,
          AttributesNames.attributeUserTimeZone,
          AttributesNames.attributeDateGrouping
        ]
      case QueryNodeTags.FILTER:
        return [
          AttributesNames.filterType,
          AttributesNames.filterIsQuickFind,
          AttributesNames.filterOverrideRecordLimit,
          AttributesNames.filterBypassQuickFind
        ]
      case QueryNodeTags.ENTITY:
        return [
          AttributesNames.entityName,
          AttributesNames.entityAlias
        ]
      case QueryNodeTags.LINK:
        return [
          AttributesNames.linkEntity,
          AttributesNames.linkFromAttribute,
          AttributesNames.linkToAttribute,
          AttributesNames.linkType,
          AttributesNames.linkAlias,
          AttributesNames.linkIntersect,
          AttributesNames.linkVisible,
          AttributesNames.linkShowOnlyLoolups
        ]
      case QueryNodeTags.ORDER:
        return[
          AttributesNames.orderAttribute,
          AttributesNames.orderDescending,
          AttributesNames.orderAlias
        ]
      case QueryNodeTags.VALUE:
        return[]
      case QueryNodeTags.ROOT:
        return[
          AttributesNames.rootTop,
          AttributesNames.rootDistinct,
          AttributesNames.rootAggregate,
          AttributesNames.rootTotalRecordsCount,
          AttributesNames.rootLateMaterialize,
          AttributesNames.rootPageSize,
          AttributesNames.rootPage,
          AttributesNames.rootPagingCookie,
          AttributesNames.rootDataSource,
          AttributesNames.rootOptions
        ]
      default:
        return []
    }
  }
}
