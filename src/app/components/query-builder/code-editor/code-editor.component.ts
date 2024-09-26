import { LinterProviderService } from '../services/xml-parsing-services/linter-provider.service';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryNodeTree } from '../models/query-node-tree';
import { QueryRenderService } from '../services/query-render.service';
import { basicSetup } from 'codemirror';
import { DOCUMENT } from '@angular/common';
import { xml, xmlLanguage } from "@codemirror/lang-xml";
import { EditorState, Extension } from '@codemirror/state';
import { keymap, EditorView } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { lintGutter } from "@codemirror/lint"
import {
  oneDark,
  oneDarkTheme,
} from '@codemirror/theme-one-dark';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeEditorComponent implements OnInit {
  @ViewChild('myeditor') myEditor: ElementRef;
  editorFormControl = new FormControl('');

  xmlRequest$: Observable<string>;
  xmlSyntaxErrors: any;

  constructor(
    private nodeTree: QueryNodeTree,
    private linterProviderService: LinterProviderService,
    private queryRendererService: QueryRenderService,
    @Inject(DOCUMENT) private document: Document
  ) { }


  ngOnInit() {
    this.queryRendererService.renderXmlRequest();
    this.xmlRequest$ = this.nodeTree.xmlRequest$;
  }

  ngAfterViewInit(): void {
    this.initializeCodeMirror();    
  }

  initializeCodeMirror() {

    const linter = this.linterProviderService.getLinter();

    let editorExtensions: Extension = [
      basicSetup,
      xml({ elements: [{ name: 'fetch', children: ['attribute', 'filter', 'link-entity', 'order', 'paging', 'value', 'link-entity'] }, xmlLanguage] }),
      oneDark,
      linter,
      lintGutter({ hoverTime: 100 })];

    let initialState = EditorState.create({
      doc: '',
      extensions: editorExtensions
    });

    let editorView = new EditorView({
      state: initialState,
      parent: this.myEditor.nativeElement,
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap]),
        history(),
        oneDarkTheme,
      ]
    });

    this.xmlRequest$.subscribe(xml => {
      editorView.dispatch({
        changes: { from: 0, to: editorView.state.doc.length, insert: xml }
      });
    });
  }
}
