import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserEnvironmentModel } from '../models/user-environment-model';
import { UrlRouteParams } from '../config/url-route-params';
import { CacheKeys } from '../config/cache-keys';
import { map } from 'rxjs';
import { EnvironmentsRequestService } from './request/environments-request.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class NavigationService {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private environmentsService: EnvironmentsRequestService) { }


  navigateToEnv(selectedEnv: UserEnvironmentModel) {
    this.environmentsService.setActiveEnvironment(selectedEnv)

    let envParam = selectedEnv.url.slice(8)

    let urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams[UrlRouteParams.environment] = envParam;

    this.router.navigateByUrl(urlTree);
  }

  handleUrlParamOnComponentInit(componentPath: string) {

    const param = this.getRouteEnvParam()
    const userIsLoggedIn = this.authService.userIsLoggedIn
    const activatedEnvironmentJSON = localStorage.getItem(CacheKeys.ActiveEnvironment)
    const activatedEnvironmentModel: UserEnvironmentModel = activatedEnvironmentJSON ? JSON.parse(activatedEnvironmentJSON) : null

    if (param) {
      this.handleExistingRouteParam(`https://${param}`, userIsLoggedIn, activatedEnvironmentModel)
    } else {
      this.handleEmptyRouteParam(componentPath, userIsLoggedIn, activatedEnvironmentModel)
    }
  }

  private handleExistingRouteParam(fullUrlParam: string, userIsLoggedIn: boolean, activatedEnvironment: UserEnvironmentModel) {
    if (userIsLoggedIn) {
      if (fullUrlParam === activatedEnvironment.url) {
        return
      } else {
        this.findEnvironmentInUsersEnvironmentsAndConnect(fullUrlParam)
      }
    } else {
      this.findEnvironmentInUsersEnvironmentsAndConnect(fullUrlParam)
    }
  }

  private handleEmptyRouteParam(componentPath: string, userIsLoggedIn: boolean, activatedEnvironment: UserEnvironmentModel) {
    if (userIsLoggedIn) {
      if (activatedEnvironment) {
        const queryParams: Params = { [UrlRouteParams.environment]: activatedEnvironment.url.slice(8) }
        this.router.navigate(
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
    this.environmentsService.getAvailableUserEnvironments()
      .pipe(
        map(env => env.find(e => e.url === urlParam)))
      .subscribe(env => {
        if (env) {
          this.environmentsService.setActiveEnvironment(env)
        } else {
          this.router.navigateByUrl('**')
        }
      })
  }

  private getRouteEnvParam(): string {
    return this.route.snapshot.paramMap.get(UrlRouteParams.environment)
  }
}
