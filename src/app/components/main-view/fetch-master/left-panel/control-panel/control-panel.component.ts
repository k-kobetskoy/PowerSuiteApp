import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from 'src/app/config/constants';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';
import { FetchNodeType } from 'src/app/models/fetch-master/fetch-node-type';

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
        selfClosing: false
      }
      console.log(node)
      this.addNodeEvent.emit(node)
  }

  constructor() { }

  ngOnInit() {
  }
}
