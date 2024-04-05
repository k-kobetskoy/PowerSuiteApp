import { ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appNodeStyle]'  
})
export class NodeStyleDirective implements OnInit {
  @Input('appPadding') padding : number 

  @HostBinding('style.padding-left.px') hostPadding


  constructor(private el: ElementRef, private r: Renderer2) { 
    

  }
  
  ngOnInit(): void {
    this.hostPadding = `${this.padding*20}`    
  }



}