import { Injectable, inject } from '@angular/core';
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EntityDefinitionsResponseModel } from 'src/app/models/incoming/environment/entity-definitions-response-model';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { GetCachedRequestProcessor } from '../request-processor/get-cached-request-processor';
import { GET_CACHED_REQUEST_PROCESSOR } from '../request-processor/tokens/tokens';
import { CacheKeys } from 'src/app/config/cache-keys';

const parameters = ['LogicalName', 'DisplayName']

@Injectable({ providedIn: 'root' })
export class EnvironmentRequestService {

    apiUrl: string

    private getCachedRequestProcessor: GetCachedRequestProcessor<EntityModel[]> = inject(GET_CACHED_REQUEST_PROCESSOR)
    private http: HttpClient = inject(HttpClient)
    
    constructor() { }

    public getEntities(url: string): Observable<EntityModel[]> {
        this.apiUrl = url
        return this.getCachedRequestProcessor.get(CacheKeys.Entities, this.getEntityDefinitions)
    }

    private getEntityDefinitions = (): Observable<EntityModel[]> => {

        return this.http.get<EntityDefinitionsResponseModel>(`${this.apiUrl}/api/data/v9.2/EntityDefinitions?$select=${parameters.join(',')}`)
            .pipe(
                map(data => {
                    return data.value.map(element => {
                        return {
                            logicalName: element.LogicalName,
                            displayName: element.DisplayName?.UserLocalizedLabel?.Label ?? ''
                        }
                    })
                })
            );
    }
}
