import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TreePanelComponent } from '../left-panel/tree-panel/tree-panel.component';
import { ControlPanelComponent } from '../left-panel/control-panel/control-panel.component';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { UserEnvironmentModel } from 'src/app/models/user-environment.model';

@Component({
  selector: 'app-fetch-parent',
  templateUrl: './fetch-parent.component.html',
  styleUrls: ['./fetch-parent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FetchParentComponent implements OnInit {

  environmentUrl: string;
  subs: Subscription[] = []
  counter: number = 0

  @ViewChild(TreePanelComponent) treePanel: TreePanelComponent
  @ViewChild(ControlPanelComponent) controlPanel: ControlPanelComponent

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.setEnvUrlOnInit()
  }

  setEnvUrlOnInit() {
    if (this.authService.userIsLoggedIn) {
      let routeEnvParam = this.getRouteEnvParam()
      let selectedEnv = localStorage.getItem('selectedEnvironment')   
      if (selectedEnv) {
        let envModel: UserEnvironmentModel = JSON.parse(selectedEnv)
        if(routeEnvParam!=envModel.apiUrl.slice(8)){

          console.log('routeEnvParam: '+ routeEnvParam)
          console.log('envModel : ' + envModel.apiUrl)
          console.log('current router url:' + `${this.router.url}`)
          console.log('redirecting to' + `${this.router.url}/${envModel.apiUrl.slice(8)}`)
          this.router.navigateByUrl(`${this.router.url}/${envModel.apiUrl.slice(8)}`)
        }        
      }
    }
  }

  setSelectedElement(selectedElement: FetchNode) {
    this.controlPanel.selectedNode = selectedElement
  }

  private getRouteEnvParam(): string {
    console.log(this.environmentUrl)
    return this.route.snapshot.paramMap.get('environment')
  }

  addTreeNode(nodeName: string) {
    this.treePanel.addBaseNodeToTree(nodeName)
    console.log(this.counter++)
  }
}
