import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/config/api-endpoints';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';
import { AttributeResponseModel } from 'src/app/models/incoming/attrubute/attribute-response-model';
import { CacheKeys } from 'src/app/config/cache-keys';
import { BaseRequestService } from 'src/app/components/query-builder/services/entity-services/abstract/base-request.service';

@Injectable({ providedIn: 'root' })
export class AttributeEntityService extends BaseRequestService {

  constructor() { super(); }
  
  getAttributes(entityLogicalName: string): Observable<AttributeModel[]> {

    this.getActiveEnvironmentUrl();

    const key = `${entityLogicalName}_${CacheKeys.EntityAttributes}`;

    const attributes$ = this.cacheService.getItem<AttributeModel[]>(key);

    if (attributes$.value) {
      return attributes$.asObservable();
    }

    return this.activeEnvironmentUrl$.pipe(
      switchMap(envUrl => {
        if (!envUrl) return of([]);

        const url = API_ENDPOINTS.attributes.getResourceUrl(envUrl, entityLogicalName);

        return this.httpClient.get<AttributeResponseModel>(url)
          .pipe(
            map(({ value }) => value.map((
              { LogicalName: logicalName, DisplayName: { UserLocalizedLabel } = {}, AttributeType: attributeType }): AttributeModel =>
            ({
              logicalName,
              displayName: UserLocalizedLabel ? UserLocalizedLabel.Label : '',
              attributeType
            }))),
            tap(data => this.cacheService.setItem(data, key))
          );
      }));
  }
}