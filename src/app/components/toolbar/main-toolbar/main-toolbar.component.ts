import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConnectionsComponent } from '../connections/connections.component';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {


  @ViewChild(ConnectionsComponent) connectionsComponent: ConnectionsComponent | undefined

  @Input() userLogedIn: boolean

  constructor() { }

  ngOnInit() {
  }
}
