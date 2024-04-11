import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TreePanelComponent } from '../left-panel/tree-panel/tree-panel.component';
import { ControlPanelComponent } from '../left-panel/control-panel/control-panel.component';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { UserEnvironmentModel } from 'src/app/models/user-environment.model';
import { LocalStorageKeys } from 'src/app/config/local-storage-keys';
import { UserDataService } from 'src/app/services/data/user-data.service';
import { UrlRouteParams } from 'src/app/config/url-route-params';


export enum UserLoginStates {
  userNotLoggedIn,
  userLoggedInNotSelectedEnv,
  userLoggedInSelectedEnv
}
@Component({
  selector: 'app-fetch-parent',
  templateUrl: './fetch-parent.component.html',
  styleUrls: ['./fetch-parent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FetchParentComponent implements OnInit {

  environmentUrl: string;
  subs: Subscription[] = []

  @ViewChild(TreePanelComponent) treePanel: TreePanelComponent
  @ViewChild(ControlPanelComponent) controlPanel: ControlPanelComponent

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userDataService: UserDataService) { }

  ngOnInit() {
    this.handleUrlParamOnComponentInit()
  }

  private handleUrlParamOnComponentInit() {

    const param = this.getRouteEnvParam()
    const userIsLoggedIn = this.userDataService.userIsLoggedIn
    const activatedEnvironmentJSON = localStorage.getItem(LocalStorageKeys.ActiveEnvironmentModel)
    const activatedEnvironmentModel: UserEnvironmentModel = activatedEnvironmentJSON ? JSON.parse(activatedEnvironmentJSON) : null

    if (param) {
      this.handleExistingRouteParam(`https://${param}`, userIsLoggedIn, activatedEnvironmentModel)
    } else {
      this.handleEmptyRouteParam(userIsLoggedIn, activatedEnvironmentModel)
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

  private handleEmptyRouteParam(userIsLoggedIn: boolean, activatedEnvironment: UserEnvironmentModel) {
    if(userIsLoggedIn){
      if(activatedEnvironment){      
        const queryParams: Params = { environment: activatedEnvironment.apiUrl.slice(8) }
        this.router.navigate(
          [],
          { 
            relativeTo: this.route,
            queryParams,
            queryParamsHandling: 'merge'
          }
        )
      } else{
        return
      }
    }
    return
  }

  private findEnvironmentInUsersEnvironmentsAndConnect(urlParam: string) {
    this.userDataService.availableUserEnvironments$
      .pipe(
        map(env => env.find(e => e.url === urlParam)))
      .subscribe(env => {
        if (env) {
          this.userDataService.connectToEnvironment(env)
        } else {
          this.router.navigateByUrl('**')
        }
      })
  }

  private getRouteEnvParam(): string {
    return this.route.snapshot.paramMap.get(UrlRouteParams.environment)
  }

  setSelectedElement(selectedElement: FetchNode) {
    this.controlPanel.selectedNode = selectedElement
  }

  addTreeNode(nodeName: string) {
    this.treePanel.addBaseNodeToTree(nodeName)
  }
}
