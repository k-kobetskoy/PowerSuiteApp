import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConnectionsComponent } from '../connections/connections.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {


  @ViewChild(ConnectionsComponent) connectionsComponent: ConnectionsComponent | undefined


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
}
