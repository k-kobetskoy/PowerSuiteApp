import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';

@Component({
  selector: 'app-root-editor',
  templateUrl: './root-editor.component.html',
  styleUrls: ['./root-editor.component.css']
})
export class RootEditorComponent implements OnInit {

  @Output() onNodeCreate: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }


  createNode(){  
      this.onNodeCreate.emit()
  }
}
