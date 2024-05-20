import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/config/api-endpoints';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';
import { AttributeResponseModel } from 'src/app/models/incoming/attrubute/attribute-response-model';
import { CacheKeys } from 'src/app/config/cache-keys';
import { BaseEntityService } from './abstract/base-entity.service';
import { ActiveEnvironment } from 'src/app/decorators/active-environment';

@Injectable({ providedIn: 'root' })
export class AttributeEntityService extends BaseEntityService {

  constructor() { super(); }

  @ActiveEnvironment
  getAttributes(entityLogicalName: string): Observable<AttributeModel[]> {

    const key = `${entityLogicalName}${CacheKeys.EntityAttributes}`;

    const attributes$ = this.cacheService.getItem<AttributeModel[]>(key);

    if (attributes$.value) {
      return attributes$.asObservable();
    }

    return this.activeEnvironmentUrl$.pipe(
      switchMap(envUrl => {

        const url = API_ENDPOINTS.attributes.getResourceUrl(envUrl, entityLogicalName);

        return this.httpClient.get<AttributeResponseModel>(url)
          .pipe(
            map(({ value }) => value.map((
              { LogicalName: logicalName, DisplayName: { UserLocalizedLabel } = {} }): AttributeModel =>
            ({
              logicalName,
              displayName: UserLocalizedLabel ? UserLocalizedLabel.Label : '',
            }))),
            tap(data => this.cacheService.setItem(data, key))
          );
      }));
  }
}