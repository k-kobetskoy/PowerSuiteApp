import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { XmlExecutorService } from '../services/xml-executor.service';
import { QueryNodeTree } from '../models/query-node-tree';
import { QueryRenderService } from '../services/query-render.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CodeEditorComponent implements OnInit{

  xmlRequest$: Observable<string>;

  constructor(private nodeTree: QueryNodeTree, private queryRendererService: QueryRenderService) { }

  ngOnInit() {
    this.queryRendererService.renderXmlRequest();
    this.xmlRequest$ = this.nodeTree.xmlRequest$;
  }
}
