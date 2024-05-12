import { Injectable, inject } from '@angular/core';
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EntityDefinitionsResponseModel } from 'src/app/models/incoming/environment/entity-definitions-response-model';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { GetCachedRequestProcessor } from '../request-processor/get-cached-request-processor';
import { GET_CACHED_ATTRIBUTE_REQUEST_PROCESSOR, GET_CACHED_ENTITY_REQUEST_PROCESSOR } from '../request-processor/tokens/tokens';
import { CacheKeys } from 'src/app/config/cache-keys';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';
import { AttributeResponseModel } from 'src/app/models/incoming/attrubute/attribute-response-model';

const entityParameters = ['LogicalName', 'DisplayName', 'EntitySetName']
const attributeParameters = ['LogicalName', 'DisplayName']

@Injectable({ providedIn: 'root' })
export class EnvironmentRequestService {

    private entitiesRequestProcessor: GetCachedRequestProcessor<EntityModel[]> = inject(GET_CACHED_ENTITY_REQUEST_PROCESSOR)
    private attributesRequestProcessor: GetCachedRequestProcessor<AttributeModel[]> = inject(GET_CACHED_ATTRIBUTE_REQUEST_PROCESSOR)
    private http: HttpClient = inject(HttpClient)
    
    constructor() { }

    public getEntities(url: string): Observable<EntityModel[]> {
        return this.entitiesRequestProcessor.get(CacheKeys.Entities, ()=>this.getEntityDefinitions(url))
    }

    public getAttributes(url: string, entityLogicalName: string): Observable<AttributeModel[]> {
        return this.attributesRequestProcessor.get(entityLogicalName, ()=>this.getAttributeDefinitions(url, entityLogicalName))
    }

    private getEntityDefinitions = (apiUrl: string): Observable<EntityModel[]> => {

        return this.http.get<EntityDefinitionsResponseModel>(`${apiUrl}/api/data/v9.2/EntityDefinitions?$select=${entityParameters.join(',')}`)
            .pipe(
                map(data => {
                    return data.value.map(element => {
                        return {
                            logicalName: element.LogicalName,
                            displayName: element.DisplayName?.UserLocalizedLabel?.Label ?? '',
                            entitySetName: element.EntitySetName
                        }
                    })
                })
            );
    }

    private getAttributeDefinitions = (apiUrl: string, entityLogicalName: string): Observable<AttributeModel[]> => {

        const url = `${apiUrl}/api/data/v9.2/EntityDefinitions(LogicalName='${entityLogicalName}')/Attributes?$select=${attributeParameters.join(',')}`;

        return this.http.get<AttributeResponseModel>(url)
            .pipe(
                map(data => {
                    return data.value.map(element => {
                        return {
                            logicalName: element.LogicalName,
                            displayName: element.DisplayName?.UserLocalizedLabel?.Label ?? '',                            
                        }
                    })
                })
            );
    }

    
}
