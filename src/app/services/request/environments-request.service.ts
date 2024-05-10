import { Inject, Injectable } from '@angular/core';
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Constants } from 'src/app/config/constants';
import { GlobalDiscoInstancesResponseModel } from 'src/app/models/incoming/global-disco/global-disco-instances-response-model';
import { EnvironmentModel } from 'src/app/models/environment-model';
import { CacheKeys } from 'src/app/config/cache-keys';
import { GetCachedRequestProcessor } from '../request-processor/get-cached-request-processor';
import { ActiveEnvironmentRequestProcessor as ActiveEnvironmentRequestProcessor } from '../request-processor/active-environment-request-processor';
import { SessionStorageService } from '../data-sorage/session-storage.service';
import { ACTIVE_ENVIRONMENT_REQUEST_PROCESSOR, GET_CACHED_REQUEST_PROCESSOR } from '../request-processor/tokens/tokens';

@Injectable({ providedIn: 'root' })
export class EnvironmentsRequestService {

  constructor(
    private http: HttpClient,
    @Inject(GET_CACHED_REQUEST_PROCESSOR) private getCachedRequestProcessor: GetCachedRequestProcessor<EnvironmentModel[]>,
    @Inject(ACTIVE_ENVIRONMENT_REQUEST_PROCESSOR) private activeEnvironmentProcessor: ActiveEnvironmentRequestProcessor<EnvironmentModel, SessionStorageService>) { }

  public getAvailableUserEnvironments(): Observable<EnvironmentModel[]> {
    return this.getCachedRequestProcessor.get(CacheKeys.AvailableEnvironments, ()=>this.getAllUserEnvironments())
  }

  public setActiveEnvironment(environment: EnvironmentModel): void {
    this.activeEnvironmentProcessor.store(environment, CacheKeys.ActiveEnvironment)
  }

  public getActiveEnvironment(): Observable<EnvironmentModel> {
    return this.activeEnvironmentProcessor.get(CacheKeys.ActiveEnvironment)
  }

  public removeActiveEnvironment(): void {
    this.activeEnvironmentProcessor.remove(CacheKeys.ActiveEnvironment)
  }

  private getAllUserEnvironments = (): Observable<EnvironmentModel[]> => {
    return this.http.get<GlobalDiscoInstancesResponseModel>(`${Constants.GlobalDiscoApiEndpoint}/${Constants.GlobalDiscoInstances}`)
      .pipe(
        map(data => {
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