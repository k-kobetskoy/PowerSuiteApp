import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { Constants } from "src/app/config/constants";
import { GraphProfileInfoModel } from "src/app/models/incoming/graph/graph-profile-response.model";

@Injectable({ providedIn: 'root' })
export class GraphDataService {

  constructor(private http: HttpClient) { }

  getProfileInfo(): Observable<GraphProfileInfoModel> {
    return this.http.get<GraphProfileInfoModel>(`${Constants.GraphApiEndpoint}/${Constants.GraphProfileInfo}`)
  }

  getProfileImage(): Observable<Blob> {
    return this.http.get(`${Constants.GraphApiEndpoint}/${Constants.GraphPhoto}`, { responseType: 'blob' })
  }
}