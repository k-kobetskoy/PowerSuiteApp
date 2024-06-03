import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryRenderService } from '../services/query-render.service';

@Component({
  selector: 'app-code-editor',
  // templateUrl: './code-editor.component.html',
  template:`<p>{{xmlRequest$|async}}</p>`,
  styleUrls: ['./code-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CodeEditorComponent implements OnInit {


  xmlRequest$: Observable<string>;

  constructor(private queryRenerer: QueryRenderService) { }
  

  ngOnInit() {
    this.xmlRequest$ = this.queryRenerer.xmlRequest$;
  }
}
