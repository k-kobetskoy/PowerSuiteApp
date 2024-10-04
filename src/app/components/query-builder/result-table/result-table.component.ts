import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { XmlExecutorService } from '../services/xml-executor.service';
import { NodeTreeProcessorService } from '../services/node-tree-processor.service';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {
  
  selectedRow: any;
  selectedOverflowCell: any;

  displayedColumns: string[];
  dataSource: Object[];
  constructor(private xmlExecutor: XmlExecutorService, private nodeTreeProcessor: NodeTreeProcessorService) { }
  @Output() resultTableGetResult = new EventEmitter<void>();

  ngOnInit() {
  }

  getResult() {
    this.resultTableGetResult.emit();
    const entitySetName = this._getEntityNodeSetName().value;

    this.nodeTreeProcessor.xmlRequest$.pipe(
      switchMap(xml => this.xmlExecutor.executeXmlRequest(xml, entitySetName)),
      tap(data => console.log(data))
    ).subscribe(data => {
      const dataKeys = Object.keys(data[0]);
      this.displayedColumns = ['No.', ...dataKeys];
      this.dataSource = data.map((item, index) => ({ 'No.': index + 1, ...item }));
    });
  }

  private _getEntityNodeSetName(): BehaviorSubject<string> {
    return this.nodeTreeProcessor.getNodeTree().value.root.next.entitySetName$;
  }

  selectRow(row: any) {
    this.selectedRow = row;
    }

    selectCell(element: Object, cell: HTMLElement) {
      if (this.isTextHidden(cell)) {
        this.selectedOverflowCell = element;
      }else if(this.selectedOverflowCell != element){
        this.selectedOverflowCell = null;
      }
    }

    isTextHidden(cell: HTMLElement): boolean {
      return cell.scrollWidth > cell.clientWidth;
    }
}