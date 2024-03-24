import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {

  @Input() userLogedIn: boolean = false;

  constructor() { }

  ngOnInit() {
  }
}
