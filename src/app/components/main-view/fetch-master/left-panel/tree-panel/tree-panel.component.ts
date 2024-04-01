import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

export class optionValue{
  name : string
  descripion : string
}


@Component({
  selector: 'app-tree-panel',
  templateUrl: './tree-panel.component.html',
  styleUrls: ['./tree-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TreePanelComponent implements OnInit {

  selectedElement: optionValue
  @Output() onElemenSelect = new EventEmitter<optionValue>()

  typesOfShoes: optionValue[] = [{name:'Boots', descripion:'descripion'}, {name:'Clogs', descripion:'descr'}, {name:'Loafers', descripion:"1234"}, {name:'Moccasins', descripion:"kfdjhh"} ];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }




  select(arg0: optionValue) {
    this.onElemenSelect.emit(arg0)    
    this.selectedElement = arg0
  }

  addElement(elName: string){
    this.typesOfShoes.push({name:elName, descripion:"addedComponent"}) 
    this.cd.detectChanges()
  }



  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];

  options = {};


}
