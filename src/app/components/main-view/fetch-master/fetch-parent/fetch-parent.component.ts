import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TreePanelComponent } from '../left-panel/tree-panel/tree-panel.component';
import { ControlPanelComponent } from '../left-panel/control-panel/control-panel.component';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';

@Component({
  selector: 'app-fetch-parent',
  templateUrl: './fetch-parent.component.html',
  styleUrls: ['./fetch-parent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FetchParentComponent implements OnInit {

  @ViewChild(TreePanelComponent) treePanel: TreePanelComponent
  @ViewChild(ControlPanelComponent) controlPanel: ControlPanelComponent

  constructor() { }

  ngOnInit() {
  }

  setSelectedElement(selectedElement: FetchNode) {
    this.controlPanel.selectedElement = selectedElement
  }

  addTreeNode(newNode: FetchNode) {
    this.treePanel.addNodeToTree(newNode)
  }
}
