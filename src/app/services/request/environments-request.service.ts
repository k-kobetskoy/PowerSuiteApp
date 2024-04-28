import { Injectable } from '@angular/core';
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Constants } from 'src/app/config/constants';
import { GlobalDiscoInstancesResponseModel } from 'src/app/models/incoming/global-disco/global-disco-instances-response-model';
import { UserEnvironmentModel as EnvironmentModel } from 'src/app/models/user-environment-model';
import { DataRequestBuiler } from '../data-request/data-request-builder';
import { CacheKeys } from 'src/app/config/cache-keys';
import { CacheStorageService } from '../data-sorage/cache-storage.service';
import { SetActiveEnvironmentRequestBuilder } from '../data-request/custom-data-query-builders/set-active-environment-query-builder';

@Injectable({ providedIn: 'root' })
export class EnvironmentsRequestService {

  private getEnvironmentsRequestBuilder = new DataRequestBuiler<EnvironmentModel[]>(this.getAllUserEnvironments, CacheKeys.AvailableEnvironments)
  private setActiveEnvironmentRequestBuilder = new SetActiveEnvironmentRequestBuilder<EnvironmentModel>(null, CacheKeys.ActiveEnvironment)

  constructor(private http: HttpClient, private cacheStorageService: CacheStorageService) { }

  public getAvailableUserEnvironments(): Observable<EnvironmentModel[]> {
    this.getEnvironmentsRequestBuilder.setDataStorage(this.cacheStorageService)
    return this.getEnvironmentsRequestBuilder.getResult(
      [
        this.getEnvironmentsRequestBuilder.getFromCache,
        this.getEnvironmentsRequestBuilder.getFromHttp,
        this.getEnvironmentsRequestBuilder.storeResult
      ]
    )
  }

  public setActiveEnvironment(environment: EnvironmentModel): void {
    this.setActiveEnvironmentRequestBuilder.set(
      [
        this.setActiveEnvironmentRequestBuilder.storeItem,
      ],
      environment
    )
  }

  private getAllUserEnvironments(): Observable<EnvironmentModel[]> {
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