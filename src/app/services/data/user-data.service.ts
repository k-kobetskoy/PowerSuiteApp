import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserEnvironmentModel } from 'src/app/models/user-environment.model';
import { AuthService } from '../auth.service';
import { UserInfoModel } from 'src/app/models/user-info.model';
import { LocalStorageKeys } from 'src/app/config/local-storage-keys';
import { GlolobalDiscoDataService } from './global-disco-data.serivce';
import { LoadingIndicationService } from '../loading-indication.service';

@Injectable({ providedIn: 'root' })
export class UserDataService implements OnDestroy {

  private _subs: Subscription[] = []

  private _envSubject$ = new BehaviorSubject<UserEnvironmentModel>(null)
  private _connectedEenvsSubject$ = new BehaviorSubject<UserEnvironmentModel[]>([])
  private _userAvailableEvnironmentsSubject$ = new BehaviorSubject<UserEnvironmentModel[]>([])
  private _userInfoSubject$ = new BehaviorSubject<UserInfoModel>(null)

  private _userEnvironmentsFetched: boolean = false

  public get userIsLoggedIn(): boolean {
    return this.authService.userIsLoggedIn
  }

  public get activeEnvironment$(): Observable<UserEnvironmentModel> {
    return this._envSubject$.asObservable()
  }

  public get environmentsConnections$(): Observable<UserEnvironmentModel[]> {
    return this._connectedEenvsSubject$.asObservable()
  }

  public get availableUserEnvironments$(): Observable<UserEnvironmentModel[]> {
    if (!this._userEnvironmentsFetched) {
      let sub = this.globalDiscoveryDataService.getAllUserEnvironments()
        .subscribe(data => {
          this._userAvailableEvnironmentsSubject$.next(data)
          this._userEnvironmentsFetched = true
        })
      this.loadingIndicatorService.showLoaderUntilComplete(sub)
      this._subs.push(sub)
    }
    return this._userAvailableEvnironmentsSubject$.asObservable()
  }

  public get userInfoModel$(): Observable<UserInfoModel> {
    return this._userInfoSubject$.asObservable();
  }

  constructor(private authService: AuthService,
    private globalDiscoveryDataService: GlolobalDiscoDataService,
    private loadingIndicatorService: LoadingIndicationService) {
    this.subscribeToLoginChanges()
  }

  subscribeToLoginChanges() {
    let loginChangesSub = this.authService.userIsLoggedIn$.subscribe(data => {
      data ? this.getAllUserRelatedData() : this.removeUserRelatedData()
    })

    this._subs.push(loginChangesSub)
  }

  private getAllUserRelatedData() {
    this._userInfoSubject$.next(JSON.parse(localStorage.getItem(LocalStorageKeys.UserProfileModel)))
    this._envSubject$.next(JSON.parse(localStorage.getItem(LocalStorageKeys.ActiveEnvironmentModel)))
    this._connectedEenvsSubject$.next(JSON.parse(localStorage.getItem(LocalStorageKeys.EnvironmentsConnectionsModels)))
  }

  private removeUserRelatedData() {
    localStorage.removeItem(LocalStorageKeys.UserProfileModel)
    localStorage.removeItem(LocalStorageKeys.ActiveEnvironmentModel)
    localStorage.removeItem(LocalStorageKeys.EnvironmentsConnectionsModels)
  }

  connectToEnvironment(activatedEnvironment: UserEnvironmentModel) {
    this.authService.addProtectedResourceToInterceptorConfig(`${activatedEnvironment.apiUrl}/api/data/v9.2/`, [`${activatedEnvironment.apiUrl}/user_impersonation`])
    
    this._envSubject$.next(activatedEnvironment)
    
    localStorage.setItem(LocalStorageKeys.ActiveEnvironmentModel, JSON.stringify(activatedEnvironment))
    let envs = <UserEnvironmentModel[]>JSON.parse(localStorage.getItem(LocalStorageKeys.EnvironmentsConnectionsModels))
    if (envs) {
      localStorage.setItem(LocalStorageKeys.EnvironmentsConnectionsModels, JSON.stringify([activatedEnvironment, ...envs]))
    }
    localStorage.setItem(LocalStorageKeys.EnvironmentsConnectionsModels, JSON.stringify([activatedEnvironment]))
  }

  ngOnDestroy(): void {
    this._subs.forEach(subscription => {
      subscription.unsubscribe()
    })
  }
}


