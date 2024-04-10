import { Injectable } from '@angular/core';
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Constants } from 'src/app/config/constants';
import { GlobalDiscoInstancesResponseModel } from 'src/app/models/incoming/global-disco/global-disco-instances-response.model';
import { UserEnvironmentModel } from 'src/app/models/user-environment.model';

@Injectable({ providedIn: 'root' })
export class GlolobalDiscoDataService {

  constructor(private http: HttpClient) { }

  getAllUserEnvironments() : Observable<UserEnvironmentModel[]> {
    return this.http.get<GlobalDiscoInstancesResponseModel>(`${Constants.GlobalDiscoApiEndpoint}/${Constants.GlobalDiscoInstances}`)
      .pipe(
        map((data) => {
          return data.value.map(element => {
            return {
              apiUrl: element.ApiUrl,
              friendlyName: element.FriendlyName,
              url: element.Url,
              urlName: element.UrlName
            }
          })
        })
      )
  }
}