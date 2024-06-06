import { LocalStorageService } from './../data-sorage/local-storage.service';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { GlobalDiscoInstancesResponseModel } from 'src/app/models/incoming/global-disco/global-disco-instances-response-model';
import { EnvironmentModel } from 'src/app/models/environment-model';
import { HttpClient } from '@angular/common/http';
import { CacheStorageService } from '../data-sorage/cache-storage.service';
import { API_ENDPOINTS } from 'src/app/config/api-endpoints';
import { CacheKeys } from 'src/app/config/cache-keys';
import { AuthService } from '../auth.service';
import { ACTIVE_ENVIRONMENT_URL } from 'src/app/models/tokens';
import { Constants } from 'src/app/config/constants';


@Injectable({ providedIn: 'root' })
export class EnvironmentEntityService {

  constructor(

    private _httpClient: HttpClient,
    private _cacheService: CacheStorageService,
    private _authService: AuthService,
    private _localStorageService: LocalStorageService,
    @Inject(ACTIVE_ENVIRONMENT_URL) private _activeEnvironmentUrl: BehaviorSubject<string>) {
  }
  getEnvironments(): Observable<EnvironmentModel[]> {
    let environments$ = this._cacheService.getItem<EnvironmentModel[]>(CacheKeys.AvailableEnvironments);

    if (environments$.value) {
      return environments$.asObservable();
    }

    const url = API_ENDPOINTS.environments.getResourceUrl();    

    return this._httpClient.get<GlobalDiscoInstancesResponseModel>(url)
      .pipe(
        map(({ value }) => value.map(({ ApiUrl: apiUrl, FriendlyName: friendlyName, Url: url, UrlName: urlName })
          : EnvironmentModel => ({ apiUrl, friendlyName, url, urlName }))),
        tap(data => this._cacheService.setItem(data, CacheKeys.AvailableEnvironments)));
  }

  setActiveEnvironment(environment: EnvironmentModel): void {
    this.getActiveEnvironment().subscribe(env => {
      if (!env) {
        this._setEnvironment(environment);
      }
    })
  }

  getActiveEnvironment(): Observable<EnvironmentModel> {
    if(!this._authService.userIsLoggedIn) {
      return of(null)
    }

    let activeEnvironment$ = this._cacheService.getItem<EnvironmentModel>(CacheKeys.ActiveEnvironment);

    if (!activeEnvironment$.value) {
      let activeEnvironment = this._localStorageService.getItem<EnvironmentModel[]>(CacheKeys.RecentActiveEnvironments)?.length > 0
        ? <EnvironmentModel>this._localStorageService.getItem<EnvironmentModel[]>(CacheKeys.RecentActiveEnvironments)[0]
        : null;

      if (activeEnvironment) {
        activeEnvironment$.next(activeEnvironment);
        this._activeEnvironmentUrl.next(activeEnvironment.apiUrl);
        this._authService.addProtectedResourceToInterceptorConfig(activeEnvironment.apiUrl);
      }
    }

    return activeEnvironment$.asObservable();
  }

  private _setEnvironment(environment: EnvironmentModel) {
    this._authService.addProtectedResourceToInterceptorConfig(environment.apiUrl);
    this._cacheService.setItem(environment, CacheKeys.ActiveEnvironment);
    this._activeEnvironmentUrl.next(environment.apiUrl);

    let environments = this._localStorageService.getItem<EnvironmentModel[]>(CacheKeys.RecentActiveEnvironments);

    if (environments) {
      this._handleExistingRecentActiveEnvironments(environments, environment);
    }

    this._localStorageService.setItem<EnvironmentModel[]>([environment], CacheKeys.RecentActiveEnvironments);
  }

  private _handleExistingRecentActiveEnvironments(environments: EnvironmentModel[], environment: EnvironmentModel) {
    const arrayLength = environments.length;

    const index = environments.findIndex(env => env.apiUrl === environment.apiUrl);

    if (index !== -1) {
      if (index === 0) {
        return;
      } else {
        environments.splice(index, 1);
      }
    }

    arrayLength < Constants.MaxRecentActiveEnvironments
      ? environments.unshift(environment)
      : environments.splice(0, 1, environment);

    this._localStorageService.setItem<EnvironmentModel[]>(environments, CacheKeys.RecentActiveEnvironments);
  }
}
