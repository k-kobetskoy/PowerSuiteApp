import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EnvironmentModel } from '../models/environment-model';
import { UrlRouteParams } from '../config/url-route-params';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { RequestService } from './request/request.service';

@Injectable({ providedIn: 'root' })
export class NavigationService implements OnInit, OnDestroy {

  subscription: Subscription

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private requestService: RequestService) { }

  ngOnInit(): void {
    this.addActiveEnvironmentToInterceptorConfig()
    console.warn('Navigation service initialized')

  }

  navigateToEnv(selectedEnv: EnvironmentModel) {
    this.requestService.setActiveEnvironment(selectedEnv)

    let envParam = selectedEnv.url.slice(8)

    let urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams[UrlRouteParams.environment] = envParam;

    this.router.navigateByUrl(urlTree);
  }

  handleUrlParamOnComponentInit(componentPath: string) {

    const currentEnvironmentUrl = this.getCurrentEnvironmentUrl()
    const userIsLoggedIn = this.authService.userIsLoggedIn

    this.requestService.getActiveEnvironment().subscribe(activatedEnvironment => {
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
    this.requestService.getEnvironments()
      .subscribe(environments => {
        if (environments) {
          let matchingEnvironment = environments.find(item => item.url === urlParam)
          this.requestService.setActiveEnvironment(matchingEnvironment)
        } else {
          this.router.navigateByUrl('**')
        }
      })
  }


  getCurrentEnvironmentUrl(): string {
    const param = this.route.snapshot.paramMap.get(UrlRouteParams.environment)

    return param ? `https://${param}` : null
  }


  addActiveEnvironmentToInterceptorConfig() {
    this.requestService.getActiveEnvironment().subscribe(env => {
      this.authService.addProtectedResourceToInterceptorConfig(env.apiUrl)
      this.authService.checkProtectedResource()
    }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}


