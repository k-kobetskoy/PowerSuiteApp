import { ComponentRef, Directive, EventEmitter, Input, OnChanges, Output, Query, SimpleChanges, Type, ViewContainerRef, inject } from '@angular/core';
import { IQueryNode } from '../components/query-builder/models/abstract/i-query-node';
import { IQueryFormComponent } from '../components/query-builder/models/abstract/i-query-form-component';
import { QueryFormsMap } from '../components/query-builder/models/constants/query-forms-map';

@Directive({ selector: '[appQueryFormFactory]' })
export class QueryFormFactoryDirective implements OnChanges {

  private container = inject(ViewContainerRef);

  @Input() selectedNode?: IQueryNode
  @Input() type?: string;
  @Output() onNodeCreate? : EventEmitter<string> = new EventEmitter<string>();

  constructor() { }


  queryFormComponent?: ComponentRef<IQueryFormComponent>;

  ngOnChanges(changes: SimpleChanges): void {
    if ('type' in changes && this.type && changes['type'].previousValue !== changes['type'].currentValue) {
      this.initComponent(this.type);

      if ('selectedNode' in changes && this.selectedNode) {
        this.applyData(this.selectedNode);
      }
    }
  }
  
  initComponent(type: string) {    
    const queryFormType: Type<IQueryFormComponent> = QueryFormsMap[type]; 

    if (this.queryFormComponent) {
      this.container.clear();
      this.queryFormComponent = undefined;
    }

    this.queryFormComponent = this.container.createComponent(queryFormType); 
    
    if (this.selectedNode) { 
      this.queryFormComponent.instance.selectedNode = this.selectedNode;
    }

    if (this.onNodeCreate) {
      this.queryFormComponent.instance.onNodeCreate = this.onNodeCreate;
    }
  }

  applyData(selectedNode: IQueryNode) { 
    if (this.queryFormComponent) {
      this.queryFormComponent.instance.selectedNode = selectedNode;
    }
  }

}
