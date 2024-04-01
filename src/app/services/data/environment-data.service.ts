import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IEntityDefinitionsResponseModel } from 'src/app/models/incoming/environment/entity-definitions-response.model';

let parameters = ['LogicalName', 'DisplayName']

@Injectable({
    providedIn: 'root'
})

export class EnvironmentDataService {

    constructor(private http: HttpClient) { }

    getEntityDefinitions(apiUrl: string): Observable<IEntityDefinitionsResponseModel> {        
        return this.http.get<IEntityDefinitionsResponseModel>(`https://${apiUrl}/api/data/v9.2/EntityDefinitions?$select=${parameters.join(',')}`)
    }
}

