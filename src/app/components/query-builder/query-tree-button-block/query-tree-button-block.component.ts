import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QueryNodeTree } from '../models/query-node-tree';
import { Subject, Observable, BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-query-tree-button-block',
  templateUrl: './query-tree-button-block.component.html',
  styleUrls: ['./query-tree-button-block.component.css']
})
export class QueryTreeButtonBlockComponent implements OnInit {

  @Output() executeXmlRequest = new EventEmitter<void>()

  buttonDisabled$: Observable<boolean>;

  constructor(private nodeTree: QueryNodeTree) { }

  ngOnInit() {
    this.setToggleButtonState();
  }

  execute() {
    this.executeXmlRequest.emit();
  }

  private _getEntityNodeSetName(): BehaviorSubject<string> {
    return this.nodeTree.root.next.entitySetName$;
  }

  setToggleButtonState(): void {
    this.buttonDisabled$ = this._getEntityNodeSetName().pipe(
      map(entitySetName => { return !entitySetName }))
  }
}
