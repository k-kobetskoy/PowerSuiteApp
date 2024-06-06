import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { BaseRequestService } from './entity-services/abstract/base-request.service';
import { API_ENDPOINTS } from 'src/app/config/api-endpoints';

@Injectable({ providedIn: 'root' })
export class XmlExecutorService extends BaseRequestService {

  constructor() { super(); }

  private _cache: {key: string, value: Document};

  executeXmlRequest(xml: string): Observable<Document> {

    this.getActiveEnvironmentUrl();

    if(this._cache && this._cache.key === xml) {
      return of(this._cache.value);
    }
    
    return this.activeEnvironmentUrl$.pipe(
      switchMap(envUrl => {
        if (!envUrl) return of(<Document>null);
    
        const url = API_ENDPOINTS.execute.getResourceUrl(envUrl);
    
        const headers = new HttpHeaders({
          'Content-Type': 'application/xml',
          'Accept': 'application/xml'
        });
    
        return this.httpClient.post(url, xml, { headers: headers, responseType: 'text' }).pipe(
          map(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            return xmlDoc;
          }),
          tap(data => this._cache = {key: xml, value: data})
        );
      })
    );
  }
}
