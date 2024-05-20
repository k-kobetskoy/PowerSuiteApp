import { Injectable } from '@angular/core';
import { Observable, map, tap, catchError, switchMap } from 'rxjs';
import { EntityDefinitionsResponseModel } from 'src/app/models/incoming/environment/entity-definitions-response-model';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { CacheKeys } from 'src/app/config/cache-keys';
import { API_ENDPOINTS } from 'src/app/config/api-endpoints';
import { BaseEntityService } from './abstract/base-entity.service';
import { ActiveEnvironment } from 'src/app/decorators/active-environment';

@Injectable({ providedIn: 'root' })
export class EntityEntityService extends BaseEntityService {

  constructor() { super(); }

  @ActiveEnvironment
  getEntities(): Observable<EntityModel[]> {

    const key = `${CacheKeys.Entities}`;

    const entities$ = this.cacheService.getItem<EntityModel[]>(key);

    if (entities$.value) {
      return entities$.asObservable();
    }

    return this.activeEnvironmentUrl$.pipe(
      switchMap(envUrl => {
        const url = API_ENDPOINTS.entities.getResourceUrl(envUrl);

        return this.httpClient.get<EntityDefinitionsResponseModel>(url)
          .pipe(
            map(({ value }) => value.map((
              { LogicalName: logicalName, DisplayName: { UserLocalizedLabel } = {}, EntitySetName: entitySetName }) =>
            ({
              logicalName,
              displayName: UserLocalizedLabel ? UserLocalizedLabel.Label : '',
              entitySetName
            }))),
            tap(data => this.cacheService.setItem(data, key))
          );
      })
    )    
  }
}
