import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TreePanelComponent, optionValue } from '../left-panel/tree-panel/tree-panel.component';
import { ControlPanelComponent } from '../left-panel/control-panel/control-panel.component';

@Component({
  selector: 'app-fetch-parent',
  templateUrl: './fetch-parent.component.html',
  styleUrls: ['./fetch-parent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FetchParentComponent implements OnInit {

  @ViewChild(TreePanelComponent) leftTopPanel: TreePanelComponent
  @ViewChild(ControlPanelComponent) leftBottomPanel: ControlPanelComponent

  constructor() { }

  ngOnInit() {
  }

  setSelectedElement(selectedElement: optionValue) {
    this.leftBottomPanel.selectedElement = selectedElement
  }

  addTreeNode(newNode: string) {
    this.leftTopPanel.addElement(newNode)
  }
}
