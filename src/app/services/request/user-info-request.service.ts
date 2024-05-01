import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "src/app/config/constants";
import { UserInfoModel as UserInfoModel } from "src/app/models/incoming/graph/user-info-model";

@Injectable({ providedIn: 'root' })
export class UserInfoRequestService {

  constructor(private http: HttpClient) { }

  getProfileInfo=(): Observable<UserInfoModel> =>{
    return this.http.get<UserInfoModel>(`${Constants.GraphApiEndpoint}/${Constants.GraphProfileInfo}`)
  }

  getProfileImage=(): Observable<Blob>=> {
    return this.http.get(`${Constants.GraphApiEndpoint}/${Constants.GraphPhoto}`, { responseType: 'blob' })
  }
}