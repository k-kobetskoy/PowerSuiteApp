import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { optionValue } from '../tree-panel/tree-panel.component';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  @Input() selectedElement: optionValue

  @Output() addElementEvent = new EventEmitter<string>()


  addElement(elementName: string) {
    if (this.selectedElement)
      console.log(this.selectedElement)

      this.addElementEvent.emit(elementName)
  }

  constructor() { }

  ngOnInit() {
  }
}
