import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-container',
  templateUrl: './view-container.component.html',
  styleUrls: ['./view-container.component.css']
})
export class ViewContainerComponent implements OnInit {

  isIframe = false;
  constructor() { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
  }
}
