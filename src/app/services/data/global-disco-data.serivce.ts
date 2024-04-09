import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Constants } from 'src/app/config/constants';
import { UserEnvironmentModel } from 'src/app/models/user-environment.model';
import { GlobalDiscoInstanceModel } from 'src/app/models/incoming/global-disco/global-disco-instance.model';

@Injectable({ providedIn: 'root' })
export class GlolobalDiscoDataService {

  private _environmentsSubject$ = new BehaviorSubject<UserEnvironmentModel[]>([]);

  public get environmentsList$() {
    return this._environmentsSubject$.asObservable();
  }

  constructor(private http: HttpClient) {
    this.getAll()
  }

  private getAll() : Observable<UserEnvironmentModel[]> {
    return this.http.get<GlobalDiscoInstanceModel[]>(`${Constants.GlobalDiscoApiEndpoint}/${Constants.GlobalDiscoInstances}`)
      .pipe(
        map((data) => {
          return data.map(element => {
            return {
              apiUrl: element.ApiUrl,
              friendlyName: element.FriendlyName,
              url: element.Url,
              urlName: element.UrlName
            }
          })
        }), tap(environments => this._environmentsSubject$.next(environments))
      )
  }
}