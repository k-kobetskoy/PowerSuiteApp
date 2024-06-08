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

  private _normalizeData(data: Object[]): Object[] {
    let allKeys = new Set<string>(); 
    data.forEach(item => {
      Object.keys(item).forEach(key => allKeys.add(key));
    });
  
    return data.map(item => {
      let normalizedItem: { [key: string]: any } = {};
      allKeys.forEach(key => {
        normalizedItem[key] = item[key] || '';
      });
      return normalizedItem;
    });
  }
}