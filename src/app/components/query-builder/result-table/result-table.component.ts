import { XmlExecuteResultModel } from './../../../models/incoming/xml-execute-result/xml-execute-result-model';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap, tap } from 'rxjs';
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

  ngOnInit() {
  }

  getResult() {
    const entitySetName = this._getEntityNodeSetName().value;

    this.nodeTree.xmlRequest$.pipe(
      switchMap(xml => this.xmlExecutor.executeXmlRequest(xml, entitySetName))
    ).subscribe(data => {
      this.displayedColumns = Object.keys(data[0]);
      this.dataSource = data;
    });
  }

  private _getEntityNodeSetName(): BehaviorSubject<string> {
    return this.nodeTree.root.next.entitySetName$;
  }
}