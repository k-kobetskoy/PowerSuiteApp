import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { Constants } from 'src/app/config/constants';
import { IGlobalDiscoInstanceModel } from 'src/app/models/incoming/global-disco/global-disco-instance.model';
import { IGlobalDiscoInstancesResponseModel } from 'src/app/models/incoming/global-disco/global-disco-instances-response.model';

let baseUrl = Constants.GLOBAL_DISCO_API_ENDPOINT
let instances = Constants.GLOBAL_DISCO_INSTANCES

@Injectable({
  providedIn: 'root'
})

export class GlolobalDiscoDataService {

  constructor(private http:HttpClient) { }

  getAll():Observable<IGlobalDiscoInstancesResponseModel>{
    return this.http.get<IGlobalDiscoInstancesResponseModel>(`${baseUrl}/${instances}`)
  }
}

