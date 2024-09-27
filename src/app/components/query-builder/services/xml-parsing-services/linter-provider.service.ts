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
import { TagsValidationService } from './tags-validation.service';


@Injectable({ providedIn: 'root' })

export class LinterProviderService {

  constructor(private tagsValidator: TagsValidationService) { }


  getLinter(): Extension {
    return linter(view => {

      let diagnostics: Diagnostic[] = []
      let tagsValidationStack: { mandatoryNodes: string[], from: number, to: number }[] = [];
      let sequenceValidationStack: string[] = [];

      syntaxTree(view.state).cursor().iterate(iteratingNode => {
        this.tagsValidator.validateTagNode(iteratingNode, tagsValidationStack, diagnostics, sequenceValidationStack, view)
      });
      return diagnostics;
    });
  }


}
