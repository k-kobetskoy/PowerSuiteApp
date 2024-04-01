import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { Constants } from "src/app/config/constants";
import { IGraphProfileInfoModel } from "src/app/models/incoming/graph/graph-profile-response.model";

let baseUrl = Constants.GRAPH_API_ENDPOINT
let profile = Constants.GRAPH_PROFILE_INFO
let photo = Constants.GRAPH_PHOTO

@Injectable({providedIn: 'root'})

export class GraphDataService{

    constructor(private http: HttpClient) {}

    getProfileInfo(): Observable<IGraphProfileInfoModel>{
        const profileInfo: IGraphProfileInfoModel = JSON.parse(localStorage.getItem(`${baseUrl}/${profile}`)!)

        if (!profileInfo) {
            return this.http.get<IGraphProfileInfoModel>(`${baseUrl}/${profile}`).pipe(
              tap((data: IGraphProfileInfoModel) => {
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