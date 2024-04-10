import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserEnvironmentModel } from 'src/app/models/user-environment.model';
import { AuthService } from '../auth.service';
import { UserInfoModel } from 'src/app/models/user-info.model';
import { LocalStorageKeys } from 'src/app/config/local-storage-keys';
import { GlolobalDiscoDataService } from './global-disco-data.serivce';

@Injectable({ providedIn: 'root' })
export class UserDataService implements OnDestroy {

  private subs: Subscription[] = []

  private _envSubject$ = new BehaviorSubject<UserEnvironmentModel>(null)
  private _connectedEenvsSubject$ = new BehaviorSubject<UserEnvironmentModel[]>([])
  private _userAvailableEvnironments$ = new BehaviorSubject<UserEnvironmentModel[]>([])
  private _userInfoSubject$ = new BehaviorSubject<UserInfoModel>(null)

  public get activeEnvironment$(): Observable<UserEnvironmentModel> {
    return this._envSubject$.asObservable()
  }

  public get environmentsConnections$(): Observable<UserEnvironmentModel[]> {
    return this._connectedEenvsSubject$.asObservable()
  }

  public get availableUserEnvironments$(): Observable<UserEnvironmentModel[]> {
    return this._userAvailableEvnironments$.asObservable()
  }

  public get userInfoModel$(): Observable<UserInfoModel> {
    return this._userInfoSubject$.asObservable();
  }

  constructor(private authService: AuthService, private globalDiscoveryDataService: GlolobalDiscoDataService) {
    this.subscribeToLoginChanges()
  }

  subscribeToLoginChanges() {
    let loginChangesSub = this.authService.userIsLoggedIn$.subscribe(data => {
      data ? this.getAllUserRelatedData() : this.removeUserRelatedData()
    })

    let userLoginEventSub = this.authService.userAdded$.subscribe(data => {
      if (data) { 
        this.getListOfUserEnvironments()
      }
    })
    
    this.subs.push(loginChangesSub, userLoginEventSub)
  }

  getAllUserRelatedData() {
    this._userInfoSubject$.next(JSON.parse(localStorage.getItem(LocalStorageKeys.UserProfileModel)))
    this._envSubject$.next(JSON.parse(localStorage.getItem(LocalStorageKeys.ActiveEnvironmentModel)))
    this._connectedEenvsSubject$.next(JSON.parse(localStorage.getItem(LocalStorageKeys.EnvironmentsConnectionsModels)))
  }

  removeUserRelatedData() {
    localStorage.removeItem(LocalStorageKeys.UserProfileModel)
    localStorage.removeItem(LocalStorageKeys.ActiveEnvironmentModel)
    localStorage.removeItem(LocalStorageKeys.EnvironmentsConnectionsModels)
  }

  getListOfUserEnvironments() {
    this.globalDiscoveryDataService.getAllUserEnvironments().subscribe(data=>{
      this._userAvailableEvnironments$.next(data)
    })
  }

  connectToEnvironment(activeEnvironment: UserEnvironmentModel) {
    this._envSubject$.next(activeEnvironment)
    localStorage.setItem(LocalStorageKeys.ActiveEnvironmentModel, JSON.stringify(activeEnvironment))
    let envs = <UserEnvironmentModel[]>JSON.parse(localStorage.getItem(LocalStorageKeys.EnvironmentsConnectionsModels))
    if (envs) {
      localStorage.setItem(LocalStorageKeys.EnvironmentsConnectionsModels, JSON.stringify([activeEnvironment, ...envs]))
    }
    localStorage.setItem(LocalStorageKeys.EnvironmentsConnectionsModels, JSON.stringify([activeEnvironment]))
  }

  ngOnDestroy(): void {
    this.subs.forEach(subscription => {
      subscription.unsubscribe()
    })
  }
}


