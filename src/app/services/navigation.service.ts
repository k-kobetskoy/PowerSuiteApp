import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EnvironmentModel } from '../models/environment-model';
import { UrlRouteParams } from '../config/url-route-params';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { EnvironmentEntityService } from '../components/query-builder/services/entity-services/environment-entity.service';

@Injectable({ providedIn: 'root' })
export class NavigationService implements OnInit, OnDestroy {

  subscription: Subscription

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _environmentEntityService: EnvironmentEntityService) { }

  ngOnInit(): void {
    this.addActiveEnvironmentToInterceptorConfig()
    console.warn('Navigation service initialized')
  }

  navigateToEnv(selectedEnv: EnvironmentModel) {
    this._environmentEntityService.setActiveEnvironment(selectedEnv)

    let envParam = selectedEnv.url.slice(8)

    let urlTree = this._router.parseUrl(this._router.url);
    urlTree.queryParams[UrlRouteParams.environment] = envParam;

    this._router.navigateByUrl(urlTree);
  }

  handleUrlParamOnComponentInit(componentPath: string) {

    const currentEnvironmentUrl = this.getCurrentEnvironmentUrl()
    const userIsLoggedIn = this._authService.userIsLoggedIn

    this._environmentEntityService.getActiveEnvironment().subscribe(activatedEnvironment => {
      if (currentEnvironmentUrl) {
        this.handleExistingRouteParam(currentEnvironmentUrl, userIsLoggedIn, activatedEnvironment)
      } else {
        this.handleEmptyRouteParam(componentPath, userIsLoggedIn, activatedEnvironment)
      }
    })
  }

  private handleExistingRouteParam(currentEnvironmentUrl: string, userIsLoggedIn: boolean, activatedEnvironment: EnvironmentModel) {

    console.log('currentEnvironmentUrl', currentEnvironmentUrl, 'activatedEnvironment', activatedEnvironment.url, 'userIsLoggedIn', userIsLoggedIn)

    if (userIsLoggedIn) {
      if (currentEnvironmentUrl === activatedEnvironment.url) {
        return
      } else {
        this.findEnvironmentInUsersEnvironmentsAndConnect(activatedEnvironment.url)
      }
    } else {
      this.findEnvironmentInUsersEnvironmentsAndConnect(activatedEnvironment.url)
    }
  }

  private handleEmptyRouteParam(componentPath: string, userIsLoggedIn: boolean, activatedEnvironment: EnvironmentModel) {

    console.log('activatedEnvironment', activatedEnvironment, 'userIsLoggedIn', userIsLoggedIn, 'componentPath', componentPath)

    if (userIsLoggedIn) {
      if (activatedEnvironment) {
        const queryParams: Params = { [UrlRouteParams.environment]: activatedEnvironment.url.slice(8) }
        this._router.navigate(
          [componentPath],
          { queryParams }
        )
      } else {
        return
      }
    }
    return
  }

  private findEnvironmentInUsersEnvironmentsAndConnect(urlParam: string) {
    this._environmentEntityService.getEnvironments()
      .subscribe(environments => {
        if (environments) {
          let matchingEnvironment = environments.find(item => item.url === urlParam)
          this._environmentEntityService.setActiveEnvironment(matchingEnvironment)
        } else {
          this._router.navigateByUrl('**')
        }
      })
  }


  getCurrentEnvironmentUrl(): string {
    const param = this._route.snapshot.paramMap.get(UrlRouteParams.environment)

    return param ? `https://${param}` : null
  }


  addActiveEnvironmentToInterceptorConfig() {
    this._environmentEntityService.getActiveEnvironment().subscribe(env => {
      this._authService.addProtectedResourceToInterceptorConfig(env.apiUrl)
      this._authService.checkProtectedResource()
    }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}


