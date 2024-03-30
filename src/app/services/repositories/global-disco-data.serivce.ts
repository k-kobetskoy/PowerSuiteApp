import { Injectable } from '@angular/core';
import { Observable, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Constants } from 'src/app/config/constants';
import { IGlobalDiscoInstancesResponseModel } from 'src/app/models/incoming/global-disco/global-disco-instances-response.model';


let baseUrl = Constants.GLOBAL_DISCO_API_ENDPOINT
let instances = Constants.GLOBAL_DISCO_INSTANCES

@Injectable({
  providedIn: 'root'
})

export class GlolobalDiscoDataService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<IGlobalDiscoInstancesResponseModel> {

    const environments: IGlobalDiscoInstancesResponseModel = JSON.parse(sessionStorage.getItem(`${baseUrl}/${instances}`)!)

    if (!environments) {
      return this.http.get<IGlobalDiscoInstancesResponseModel>(`${baseUrl}/${instances}`).pipe(
        tap((data: IGlobalDiscoInstancesResponseModel) => {
          sessionStorage.setItem(`${baseUrl}/${instances}`, JSON.stringify(data))
        })
      )
    }
    
    return of(environments)
  }
}