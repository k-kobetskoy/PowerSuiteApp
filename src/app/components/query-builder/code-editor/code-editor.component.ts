import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryNodeTree } from '../models/query-node-tree';
import { QueryRenderService } from '../services/query-render.service';
import * as monaco from 'monaco-editor';
import { IDisposable } from 'monaco-editor';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CodeEditorComponent implements OnInit {
  editorOptions = { theme: 'vs-light', language: 'html', formatOnPaste: true };
  xmlRequest$: Observable<string>;
  private _contentChangeListener: IDisposable;
  private _editor: monaco.editor.IStandaloneCodeEditor;


  constructor(private nodeTree: QueryNodeTree, private queryRendererService: QueryRenderService) { }

  ngOnInit() {
    this.queryRendererService.renderXmlRequest();
    this.xmlRequest$ = this.nodeTree.xmlRequest$;
  }
  onEditorInit(editor: monaco.editor.IStandaloneCodeEditor) {
    this._editor = editor;


    editor.onDidChangeModelContent(event => {
      const changes: monaco.editor.IModelContentChange[] = event.changes;
      const model: monaco.editor.ITextModel = editor.getModel();

      changes.forEach((change) => {
        // Extract the changed text and its range
        const { range, text } = change;

        // Perform validation on the changed text
        const validationResults = this.validateChange(text, range);

        // Update markers based on validation results
        this.updateMarkers(model, validationResults);
      });
    });

  }

  validateChange(text, range) {
    // Placeholder for validation logic
    // Return an array of objects representing validation issues
    return [{
      message: 'Example error',
      severity: monaco.MarkerSeverity.Error,
      startLineNumber: range.startLineNumber,
      startColumn: range.startColumn,
      endLineNumber: range.endLineNumber,
      endColumn: range.endColumn,
    }];
  }

  updateMarkers(model, validationResults) {
    // Convert validation results to Monaco markers
    const markers = validationResults.map(result => ({
      ...result,
      owner: 'xmlValidator',
      resource: model.uri,
    }));

    // Set markers on the model
    monaco.editor.setModelMarkers(model, 'xmlValidator', markers);
  }


  getEditorContent(): string {
    return this._editor.getValue();
  }

  // highlightTagsWithProperty() {
  //   const model = this._editor.getModel();
  //   if (model) {
  //     const decorations = [];
  //     const regex = /<div[^>]*class="highlight"[^>]*>/g; // Example: Find <div> tags with class="highlight"
  //     let match;
  //     while ((match = regex.exec(model.getValue())) !== null) {
  //       const startPos = model.getPositionAt(match.index);
  //       const endPos = model.getPositionAt(match.index + match[0].length);
  //       decorations.push({
  //         range: new monaco.Range(startPos.lineNumber, startPos.column, endPos.lineNumber, endPos.column),
  //         options: {
  //           inlineClassName: 'highlight-tag'
  //         }
  //       });
  //     }

  //     this._editor.deltaDecorations([], decorations);
  //   }
  // }

  // onEditorInit(editor: monaco.editor.IStandaloneCodeEditor) {
  // console.log('Editor is ready', editor);

  //const model = editor.getModel();
  //if (model) {
  //this.contentChangeListener = model.onDidChangeContent((event) => {
  // console.log('Model changed:', model.getValue());
  // Trigger the format action each time the model changes

  // editor.getAction('editor.action.formatDocument').run();

  //      });
  //}
  // }
}
