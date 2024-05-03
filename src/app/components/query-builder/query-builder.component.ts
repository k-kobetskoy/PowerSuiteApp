import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TreePanelComponent } from './tree-panel/tree-panel.component';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QueryBuilder implements OnInit {

  environmentUrl: string;
  subs: Subscription[] = []

  @ViewChild(TreePanelComponent) treePanel: TreePanelComponent

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.navigationService.handleUrlParamOnComponentInit('/querybuilder')
  }

  addTreeNode(nodeName: string) {
    this.treePanel.addBaseNodeToTree(nodeName)
  }
}
