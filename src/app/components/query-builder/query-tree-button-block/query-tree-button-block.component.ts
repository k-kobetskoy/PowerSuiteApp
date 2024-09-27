import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { NodeTreeProcessorService } from '../services/node-tree-processor.service';

@Component({
  selector: 'app-query-tree-button-block',
  templateUrl: './query-tree-button-block.component.html',
  styleUrls: ['./query-tree-button-block.component.css']
})
export class QueryTreeButtonBlockComponent implements OnInit {

  @Output() executeXmlRequest = new EventEmitter<void>()

  buttonDisabled$: Observable<boolean>;

  constructor(private nodeTreeProcessor: NodeTreeProcessorService) { }

  ngOnInit() {
    this.setToggleButtonState();
  }

  execute() {
    this.executeXmlRequest.emit();
  }

  private _getEntityNodeSetName(): BehaviorSubject<string> {
    return this.nodeTreeProcessor.getNodeTree().value.root.next.entitySetName$;
  }

  setToggleButtonState(): void {
    this.buttonDisabled$ = this._getEntityNodeSetName().pipe(
      map(entitySetName => { return !entitySetName }))
  }
}
