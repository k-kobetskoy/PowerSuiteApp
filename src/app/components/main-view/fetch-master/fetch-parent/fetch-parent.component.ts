import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TreePanelComponent } from '../left-panel/tree-panel/tree-panel.component';
import { ControlPanelComponent } from '../left-panel/control-panel/control-panel.component';
import { QueryNode } from 'src/app/models/query-builder/query-node';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

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

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.navigationService.handleUrlParamOnComponentInit('/querybuilder')
  }

  setSelectedElement(selectedElement: QueryNode) {
    this.controlPanel.selectedNode = selectedElement
  }

  addTreeNode(nodeName: string) {
    this.treePanel.addBaseNodeToTree(nodeName)
  }
}
