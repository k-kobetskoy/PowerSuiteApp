import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  @Input() selectedElement: FetchNode

  @Output() addNodeEvent = new EventEmitter<FetchNode>()

  constatnts = Constants
  



  addElement(elementName: string) {
    if (this.selectedElement)
      console.log(this.selectedElement)


      let node : FetchNode= {
        id: null,
        name: elementName,
        order: null,
        type: Constants.attribute,
        actions: [],
        inputs: [],
        children: [],
        selfClosing: false,
        expandable: false,
        level: 0,
        isExpanded: false,
        next: new FetchNode,
        nextExists: false
      }
      console.log(node)
      this.addNodeEvent.emit(node)
  }

  constructor() { }

  ngOnInit() {
  }
}
