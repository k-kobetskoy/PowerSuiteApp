import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { QueryNodeTree } from '../models/query-node-tree';
import { XmlExecutorService } from '../services/xml-executor.service';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {

  displayedColumns: string[];
  dataSource: Object[];
  constructor(private xmlExecutor: XmlExecutorService, private nodeTree: QueryNodeTree) { }
  @Output() resultTableGetResult = new EventEmitter<void>();

  ngOnInit() {
  }

  getResult() {
    this.resultTableGetResult.emit();
    const entitySetName = this._getEntityNodeSetName().value;

    this.nodeTree.xmlRequest$.pipe(
      switchMap(xml => this.xmlExecutor.executeXmlRequest(xml, entitySetName)),
      tap(data => console.log(data))
    ).subscribe(data => {
      const dataKeys = Object.keys(data[0]);
      this.displayedColumns = ['No.', ...dataKeys];
      this.dataSource = data.map((item, index) => ({ 'No.': index + 1, ...item }));
    });
  }

  private _getEntityNodeSetName(): BehaviorSubject<string> {
    return this.nodeTree.root.next.entitySetName$;
  }
}