import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  connectionEstablished : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  connect(){
    this.connectionEstablished = !this.connectionEstablished
  }
}
