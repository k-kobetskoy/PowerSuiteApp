import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EnvironmentModel } from '../models/environment-model';
import { UrlRouteParams } from '../config/url-route-params';
import { EnvironmentsRequestService } from './request/environments-request.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class NavigationService {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private environmentsService: EnvironmentsRequestService) { }

  navigateToEnv(selectedEnv: EnvironmentModel) {
    this.environmentsService.setActiveEnvironment(selectedEnv)

    let envParam = selectedEnv.url.slice(8)

    let urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams[UrlRouteParams.environment] = envParam;

    this.router.navigateByUrl(urlTree);
  }

  handleUrlParamOnComponentInit(componentPath: string) {

    const currentEnvironmentUrl = this.getCurrentEnvironmentUrl()
    const userIsLoggedIn = this.authService.userIsLoggedIn
    let environment: EnvironmentModel

    this.environmentsService.getActiveEnvironment().subscribe(result => {
      environment = result
    })

    const activatedEnvironment: EnvironmentModel = environment ? environment : null

    if (currentEnvironmentUrl) {
      this.handleExistingRouteParam(currentEnvironmentUrl, userIsLoggedIn, activatedEnvironment)
    } else {
      this.handleEmptyRouteParam(componentPath, userIsLoggedIn, activatedEnvironment)
    }
  }

  private handleExistingRouteParam(currentEnvironmentUrl: string, userIsLoggedIn: boolean, activatedEnvironment: EnvironmentModel) {
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
      .subscribe(environments => {
        if (environments) {
          let matchingEnvironment = environments.find(item => item.url === urlParam)
          this.environmentsService.setActiveEnvironment(matchingEnvironment)
        } else {
          this.router.navigateByUrl('**')
        }
      })
  }


  getCurrentEnvironmentUrl(): string {
    const param = this.route.snapshot.paramMap.get(UrlRouteParams.environment)

    return param ? `https://${param}` : null
  }
}
