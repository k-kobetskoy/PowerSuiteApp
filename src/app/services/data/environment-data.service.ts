import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EntityDefinitionsResponseModel } from 'src/app/models/incoming/environment/entity-definitions-response.model';
import { UserEnvironmentModel } from 'src/app/models/user-environment.model';

let parameters = ['LogicalName', 'DisplayName']

@Injectable({
    providedIn: 'root'
})

export class EnvironmentDataService {


    constructor(private http: HttpClient) { }

    getEntityDefinitions(apiUrl: string): Observable<EntityDefinitionsResponseModel> {
        return this.http.get<EntityDefinitionsResponseModel>(`https://${apiUrl}/api/data/v9.2/EntityDefinitions?$select=${parameters.join(',')}`)
    }
}

