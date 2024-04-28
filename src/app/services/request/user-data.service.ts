import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserEnvironmentModel } from 'src/app/models/user-environment-model';
import { AuthService } from '../auth.service';
import { UserInfoModel } from 'src/app/models/user-info.model';
import { CacheKeys } from 'src/app/config/cache-keys';


@Injectable({ providedIn: 'root' })
export class UserDataService implements OnDestroy {

  private _subs: Subscription[] = []

  private _activeEnvironmentSubject$ = new BehaviorSubject<UserEnvironmentModel>(null)
  private _connectedEnvironmentsSubject$ = new BehaviorSubject<UserEnvironmentModel[]>([])
  private _userAvailableEvnironmentsSubject$ = new BehaviorSubject<UserEnvironmentModel[]>([])
  private _userInfoSubject$ = new BehaviorSubject<UserInfoModel>(null)

  private _userEnvironmentsFetched: boolean = false

  public get userIsLoggedIn(): boolean {
    return this.authService.userIsLoggedIn
  }

  public get activeEnvironment$(): Observable<UserEnvironmentModel> {
    return this._activeEnvironmentSubject$.asObservable()
  }

  public get environmentsConnections$(): Observable<UserEnvironmentModel[]> {
    return this._connectedEnvironmentsSubject$.asObservable()
  }

  public get userInfoModel$(): Observable<UserInfoModel> {
    return this._userInfoSubject$.asObservable();
  }

  constructor(
    private authService: AuthService) {
    this.subscribeToLoginChanges()
  }

  subscribeToLoginChanges() {
    let loginChangesSub = this.authService.userIsLoggedIn$.subscribe(data => {
      data ? this.getAllUserRelatedData() : this.removeUserRelatedData()
    })

    this._subs.push(loginChangesSub)
  }

  private getAllUserRelatedData() {
    this._userInfoSubject$.next(JSON.parse(localStorage.getItem(CacheKeys.UserProfileInfo)))
    this._activeEnvironmentSubject$.next(JSON.parse(localStorage.getItem(CacheKeys.ActiveEnvironment)))
    this._connectedEnvironmentsSubject$.next(JSON.parse(localStorage.getItem(CacheKeys.RecentActiveEnvironments)))
  }

  private removeUserRelatedData() {
    localStorage.removeItem(CacheKeys.UserProfileInfo)
    localStorage.removeItem(CacheKeys.ActiveEnvironment)
    localStorage.removeItem(CacheKeys.RecentActiveEnvironments)
  }

  connectToEnvironment(activatedEnvironment: UserEnvironmentModel) {
    this.authService.addProtectedResourceToInterceptorConfig(`${activatedEnvironment.apiUrl}/api/data/v9.2/`, [`${activatedEnvironment.apiUrl}/user_impersonation`])
    
    this._activeEnvironmentSubject$.next(activatedEnvironment)
    
    localStorage.setItem(CacheKeys.ActiveEnvironment, JSON.stringify(activatedEnvironment))
    let envs = <UserEnvironmentModel[]>JSON.parse(localStorage.getItem(CacheKeys.RecentActiveEnvironments))
    if (envs) {
      localStorage.setItem(CacheKeys.RecentActiveEnvironments, JSON.stringify([activatedEnvironment, ...envs]))
    }
    localStorage.setItem(CacheKeys.RecentActiveEnvironments, JSON.stringify([activatedEnvironment]))
  }

  ngOnDestroy(): void {
    this._subs.forEach(subscription => {
      subscription.unsubscribe()
    })
  }
}


