import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserEnvironmentModel } from 'src/app/models/user-environment.model';
import { AuthService } from '../auth.service';
import { UserInfoModel } from 'src/app/models/user-info.model';
import { LocalStorageKeys } from 'src/app/config/local-storage-keys';

@Injectable({ providedIn: 'root' })
export class UserDataService {

  private _envSubject$ = new BehaviorSubject<UserEnvironmentModel>(null)
  private _envsSubject$ = new BehaviorSubject<UserEnvironmentModel[]>([])
  private _userInfoSubject$ = new BehaviorSubject<UserInfoModel>(null)

  public get activeEnvironment$(): Observable<UserEnvironmentModel> {
    return this._envSubject$.asObservable()
  }

  public get environmentsConnections$(): Observable<UserEnvironmentModel[]> {
    return this._envsSubject$.asObservable();
  }

  public get userInfoModel$(): Observable<UserInfoModel> {
    return this._userInfoSubject$.asObservable();
  }

  constructor(private authService: AuthService) {
    this.subscribeToUserStateChanges()    
  }

  subscribeToUserStateChanges() {
    this.authService.userIsLoggedIn$.subscribe(it => {
      it ? this.getAllUserRelatedData() : this.removeUserRelatedData()
    })
  }

  getAllUserRelatedData() {
    this._userInfoSubject$.next(JSON.parse(localStorage.getItem(LocalStorageKeys.UserProfileModel)))
    this._envSubject$.next(JSON.parse(localStorage.getItem(LocalStorageKeys.ActiveEnvironmentModel)))
    this._envsSubject$.next(JSON.parse(localStorage.getItem(LocalStorageKeys.EnvironmentsConnectionsModels)))
  }

  removeUserRelatedData() {
    localStorage.removeItem(LocalStorageKeys.UserProfileModel)
    localStorage.removeItem(LocalStorageKeys.ActiveEnvironmentModel)
    localStorage.removeItem(LocalStorageKeys.EnvironmentsConnectionsModels)
  }

  connectToEnvironment(activeEnvironment: UserEnvironmentModel) {
    this._envSubject$.next(activeEnvironment)
    localStorage.setItem(LocalStorageKeys.ActiveEnvironmentModel, JSON.stringify(activeEnvironment))
    let envs = <UserEnvironmentModel[]>JSON.parse(localStorage.getItem(LocalStorageKeys.EnvironmentsConnectionsModels)) 
    if(envs){
      localStorage.setItem(LocalStorageKeys.EnvironmentsConnectionsModels, JSON.stringify([activeEnvironment, ...envs]) )
    }
    localStorage.setItem(LocalStorageKeys.EnvironmentsConnectionsModels, JSON.stringify([activeEnvironment]) )
  }
}
