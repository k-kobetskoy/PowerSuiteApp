import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { Constants } from "src/app/config/constants";
import { GraphProfileInfoModel } from "src/app/models/incoming/graph/graph-profile-response.model";

let baseUrl = Constants.urls.get('GRAPH_API_ENDPOINT')
let profile = Constants.urls.get('GRAPH_PROFILE_INFO')
let photo = Constants.urls.get('GRAPH_PHOTO')

@Injectable({providedIn: 'root'})

export class GraphDataService{

    constructor(private http: HttpClient) {}

    getProfileInfo(): Observable<GraphProfileInfoModel>{
        const profileInfo: GraphProfileInfoModel = JSON.parse(localStorage.getItem(`${baseUrl}/${profile}`)!)

        if (!profileInfo) {
            return this.http.get<GraphProfileInfoModel>(`${baseUrl}/${profile}`).pipe(
              tap((data: GraphProfileInfoModel) => {
                localStorage.setItem(`${baseUrl}/${profile}`, JSON.stringify(data))
              })
            )
          }

          return of(profileInfo)
    }

    getProfileImage(): Observable<Blob>{
        return this.http.get(`${baseUrl}/${photo}`, {responseType: 'blob'})        
    }
}