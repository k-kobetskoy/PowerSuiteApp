import { Injectable } from '@angular/core';
import { Observable, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Constants } from 'src/app/config/constants';
import { GlobalDiscoInstancesResponseModel } from 'src/app/models/incoming/global-disco/global-disco-instances-response.model';


let baseUrl = Constants.GlobalDiscoApiEndpoint
let instances = Constants.GlobalDiscoInstances

@Injectable({
  providedIn: 'root'
})

export class GlolobalDiscoDataService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<GlobalDiscoInstancesResponseModel> {

    const environments: GlobalDiscoInstancesResponseModel = JSON.parse(sessionStorage.getItem(`${baseUrl}/${instances}`)!)

    if (!environments) {
      return this.http.get<GlobalDiscoInstancesResponseModel>(`${baseUrl}/${instances}`).pipe(
        tap((data: GlobalDiscoInstancesResponseModel) => {
          sessionStorage.setItem(`${baseUrl}/${instances}`, JSON.stringify(data))
        })
      )
    }
    
    return of(environments)
  }
}