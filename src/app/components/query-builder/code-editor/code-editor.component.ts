import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SyntaxNode } from '@lezer/common';
import { Observable, fromEvent } from 'rxjs';
import { QueryNodeTree } from '../models/query-node-tree';
import { QueryRenderService } from '../services/query-render.service';
import { basicSetup } from 'codemirror';
import { DOCUMENT } from '@angular/common';
import { language } from "@codemirror/language"
import { xml, xmlLanguage } from "@codemirror/lang-xml";
import { Compartment, EditorState, Extension } from '@codemirror/state';
import { keymap, EditorView } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { syntaxTree } from "@codemirror/language"
import { linter, Diagnostic, lintGutter } from "@codemirror/lint"
import {
  oneDark,
  oneDarkTheme,
  oneDarkHighlightStyle,
} from '@codemirror/theme-one-dark';

import {
  syntaxHighlighting,
  defaultHighlightStyle,
} from '@codemirror/language';
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
    private queryRendererService: QueryRenderService,
    @Inject(DOCUMENT) private document: Document
  ) { }


  ngOnInit() {
    this.queryRendererService.renderXmlRequest();
    this.xmlRequest$ = this.nodeTree.xmlRequest$;
  }

  ngAfterViewInit(): void {

    const tagLinter = linter(view => {

      let diagnostics: Diagnostic[] = []
      let tagValidationStack: { mandatoryElementNames: string[], validationError: string, from: number, to: number }[] = [];

      let currentlyValidatingElement: { mandatoryElementNames: string[], validationError: string, from: number, to: number };

      syntaxTree(view.state).cursor().iterate(node => {

        
        if(!currentlyValidatingElement) {
          currentlyValidatingElement = tagValidationStack.pop();
        }

        if(currentlyValidatingElement){
          this.validateTag()
        }


        if (node.name == '⚠') {
          diagnostics.push({
            from: node.from,
            to: node.to,
            severity: "error",
            message: `Are you missing something?`
          })
        } else {
          console.log(node.name)
        }

        // No open tag
        if (node.name == "MismatchedCloseTag") {
          let tagName = this.getTagAsString(view.state, node.from, node.to);
          diagnostics.push({
            from: node.from,
            to: node.to,
            severity: "error",
            message: `No open tag for ${tagName}`
          })
        }


        // if (node.name == 'Element') {
        //   const attributeName = this.getElementAsString(view.state, node.from, node.to);
        //   const countOfCharacterEquals = attributeName.replace(/[^=]/g, ''); // Count of '=' characters in attribute with value
        //   const countOfCharacterQuotes = attributeName.replace(/[^"]/g, ''); // Count of quotes in attribute with value

        //   if (countOfCharacterEquals.length === 0) {
        //     diagnostics.push({
        //       from: node.from,
        //       to: node.to,
        //       severity: 'error',
        //       message: `Attribute ${attributeName} miss symbol '='`
        //     });

        //     return;
        //   }
        //   if (countOfCharacterEquals.length > 1 || countOfCharacterQuotes.length < 2) {
        //     diagnostics.push({
        //       from: node.from,
        //       to: node.to,
        //       severity: 'error',
        //       message: `Have open quote ${attributeName}`
        //     });
        //   }
        // }

        if (node.name === 'Element') {
          const openingTag = node.node.firstChild;
          const closingTag = node.node.lastChild;

          if (openingTag.name === 'SelfClosingTag') {
            return;
          }

          if (!openingTag || openingTag.name !== 'OpenTag') {
            return;
          }

          // const openingTagName = this.getNodeName(openingTag, view.state);
          // const closingTagName = this.getNodeName(closingTag, view.state);

          // if (!openingTagName) { 
          //   diagnostics.push({
          //     from: openingTag.from,
          //     to: openingTag.to,
          //     severity: 'error',
          //     message: `Missing opening tag name`
          //   })
          // }

          // if(!closingTagName) {
          //   diagnostics.push({
          //     from: closingTag.from,
          //     to: closingTag.to,
          //     severity: 'error',
          //     message: `Missing closing tag name`
          //   })
          // }

          if (!closingTag || closingTag.name !== 'CloseTag') {

            diagnostics.push({
              from: openingTag.from,
              to: openingTag.to,
              severity: 'error',
              message: `Missing closing tag`
            })
          }
        }


      });
      return diagnostics;
    })


    let myExt: Extension = [
      basicSetup,
      xml({ elements: [{ name: 'fetch', children: ['attribute', 'filter', 'link-entity', 'order', 'paging', 'value', 'link-entity'] }, xmlLanguage] }),
      oneDark,
      tagLinter,
      lintGutter({ hoverTime: 100 })];

    let initialState: EditorState;

    initialState = EditorState.create({
      doc: '',
      extensions: myExt
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

  getElementAsString(state: EditorState, from: number, to: number): string | undefined {
    if (!from || !to) return undefined;
    return state.doc.sliceString(from, to);
  }


  getTagAsString(state: EditorState, from: number | undefined, to: number | undefined): string | undefined {
    if (!from || !to) return undefined;
    return state.doc.sliceString(from, to);
  }
}
