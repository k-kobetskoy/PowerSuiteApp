import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TreePanelComponent } from './tree-panel/tree-panel.component';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QueryBuilder implements OnInit {

  environmentUrl: string = '/querybuilder';

  @ViewChild(TreePanelComponent) treePanel: TreePanelComponent

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.navigationService.handleUrlParamOnComponentInit(this.environmentUrl)
  }

  addTreeNode(nodeName: string) {
    this.treePanel.addNodeToTree(nodeName)
  }
}
