import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { BaseRequestService } from './entity-services/abstract/base-request.service';
import { API_ENDPOINTS } from 'src/app/config/api-endpoints';
import { XmlExecuteResultModel } from 'src/app/models/incoming/xml-execute-result/xml-execute-result-model';

@Injectable({ providedIn: 'root' })
export class XmlExecutorService extends BaseRequestService {

  constructor() { super(); }

  executeXmlRequest(xml: string, entity: string): Observable<Object[]> {

    this.getActiveEnvironmentUrl();

    return this.activeEnvironmentUrl$.pipe(
      switchMap(envUrl => {
        if (!envUrl) return of(null);

        const encodedXml = encodeURIComponent(xml);
        const url = API_ENDPOINTS.execute.getResourceUrl(envUrl, entity, encodedXml);

        return this.httpClient.get<XmlExecuteResultModel>(url);
      }),
      map(result => this._normalizeData(result.value))
    );
  }

  private _normalizeData<T extends { [key: string]: any }>(data: T[]): T[] {
    let allKeys = new Set<keyof T>();
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== '@odata.etag') {
          allKeys.add(key as keyof T)
        }
      });
    });

    return data.map(item => {
      let normalizedItem = {} as T;
      allKeys.forEach(key => {
        normalizedItem[key] = item[key] !== undefined ? item[key] as T[keyof T] : null;
      });
      return normalizedItem;
    });
  }
}