import { Directive, HostBinding,  Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appNodeStyle]'
})
export class NodeStyleDirective implements OnInit {
  @Input('appPadding') padding : number

  @HostBinding('style.padding-left.px') hostPadding: string

  constructor() {}
  
  ngOnInit(): void {
    this.hostPadding = `${this.padding*10}`
  }
}
