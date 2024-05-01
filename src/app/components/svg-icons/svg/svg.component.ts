import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html'
})
export class SvgComponent implements OnInit {

  constructor() { }
  @Input() class: string = ''
  @Input() fillColor: string = 'rgb(0, 0, 0)';
  @Input() icon: string;
  @Input() size: string = '24'

  ngOnInit() {
  }

}
