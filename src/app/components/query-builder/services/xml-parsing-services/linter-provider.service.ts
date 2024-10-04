import { Injectable } from '@angular/core';
import { syntaxTree } from "@codemirror/language"
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SyntaxNode, SyntaxNodeRef } from '@lezer/common';
import { Observable } from 'rxjs';
import { basicSetup } from 'codemirror';
import { DOCUMENT } from '@angular/common';
import { xml, xmlLanguage } from "@codemirror/lang-xml";
import { EditorState, Extension } from '@codemirror/state';
import { keymap, EditorView } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { linter, Diagnostic, lintGutter } from "@codemirror/lint"
import { BasicXmlValidationService } from './basic-xml-validation.service';
import { XmlParseService } from './xml-parse.service';


@Injectable({ providedIn: 'root' })

export class LinterProviderService {

  constructor(private tagsValidator: BasicXmlValidationService, private xmlParser: XmlParseService) { }

  getLinter(): Extension {
    return linter(view => {

      let basicXmlValidationErrors: Diagnostic[] = [];
      let xmlParseErrors: Diagnostic[] = [];

      let tagsValidationStack: { mandatoryNodes: string[], from: number, to: number }[] = [];
      let sequenceValidationStack: string[] = [];

      syntaxTree(view.state).cursor().iterate(iteratingNode => {
        this.tagsValidator.validateTagNode(iteratingNode, tagsValidationStack, basicXmlValidationErrors, sequenceValidationStack, view)

        if (basicXmlValidationErrors.length === 0) {
          this.xmlParser.parseNode(iteratingNode, view, xmlParseErrors)
        }

      });


      if (basicXmlValidationErrors.length > 0) {
        return basicXmlValidationErrors;
      }

      return xmlParseErrors;
    });
  }
}
