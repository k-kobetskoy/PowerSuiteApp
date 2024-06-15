import { Injectable } from '@angular/core';
import { BaseRequestService } from 'src/app/components/query-builder/services/entity-services/abstract/base-request.service';
import { Observable, switchMap, of, map, tap } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/config/api-endpoints';
import { BooleanModel } from 'src/app/models/incoming/boolean/boolean-model';
import { BooleanResponseModel } from 'src/app/models/incoming/boolean/boolean-response-model';

@Injectable({ providedIn: 'root' })
export class BooleanEntityService extends BaseRequestService {

  constructor() { super(); }

  getBooleanValues(entityLogicalName: string, attributeName: string): Observable<BooleanModel> {

    this.getActiveEnvironmentUrl();

    const key = `${entityLogicalName}_${attributeName}`;

    const booleanOptions$ = this.cacheService.getItem<BooleanModel>(key);

    if (booleanOptions$.value) {
      return booleanOptions$.asObservable();
    }

    return this.activeEnvironmentUrl$.pipe(
      switchMap(envUrl => {
        if (!envUrl) return of(null);

        const url = API_ENDPOINTS.boolean.getResourceUrl(envUrl, entityLogicalName, attributeName);

        return this.httpClient.get<BooleanResponseModel>(url).pipe(
          map(response => ({
            true: { value: response.TrueOption.Value, label: response.TrueOption.Label.UserLocalizedLabel.Label },
            false: { value: response.FalseOption.Value, label: response.FalseOption.Label.UserLocalizedLabel.Label }
          })),
          tap(data => this.cacheService.setItem<BooleanModel>(data, key)));
      })
    );
  }
}
