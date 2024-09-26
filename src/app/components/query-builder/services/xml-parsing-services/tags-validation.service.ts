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


export const TAG_NODE_NAMES = {
  openTag: 'OpenTag',
  closeTag: 'CloseTag',
  startNode: 'StartTag',
  startCloseNode: 'StartCloseTag',
  tagName: 'TagName',
  endNode: 'EndTag',
  text: 'Text',
  selfClosingTag: 'SelfClosingTag',
  selfClosingEndNode: 'SelfCloseEndTag',
  element: 'Element',
  mismatchedCloseNode: 'MismatchedCloseTag',
  unexpectedParsingError: '⚠'
};

export const PARSING_ERRORS = {
  genericTagError: 'There is a problem with the tag. Are you missing something?',
  missingClosingTag: 'Missing closing tag',
  missingTagName: 'Missing tag name',
  unexpectedParsingError: 'Unexpected parsing error. Please check you XML',
  mismatchedCloseTag: 'Mismatched close tag',
  unwantedText: 'Unwanted text'
};

export const TAG_NODES = {
  openTagNodes: ['EndTag', 'TagName', 'StartTag'],
  closeTagNodes: ['EndTag', 'TagName', 'StartCloseTag'],
  selfClosingTagNodes: ['SelfCloseEndTag', 'TagName', 'StartTag'],
};

@Injectable({
  providedIn: 'root'
})
export class TagsValidationService {

  constructor() { }

  validateTagNode(iteratingNode: SyntaxNodeRef, tagsValidationStack: { mandatoryNodes: string[]; from: number; to: number; }[], diagnostics: Diagnostic[], sequenceValidationStack: string[], view: EditorView) {
    switch (iteratingNode.name) {
      case TAG_NODE_NAMES.element:
        this.addElementNodesToStack(iteratingNode, tagsValidationStack);
        this.validateElement(iteratingNode, diagnostics);
        break;
      case TAG_NODE_NAMES.openTag:
        sequenceValidationStack.push(TAG_NODE_NAMES.openTag);
        break;
      case TAG_NODE_NAMES.closeTag:
        sequenceValidationStack.push(TAG_NODE_NAMES.closeTag);
        break;
      case TAG_NODE_NAMES.selfClosingTag:
        sequenceValidationStack.push(TAG_NODE_NAMES.selfClosingTag);
        break;
      case TAG_NODE_NAMES.text:
        this.validateTextNode(iteratingNode, diagnostics, view);
        break;
      case TAG_NODE_NAMES.startNode:
        if (this.validateStartNode(iteratingNode, sequenceValidationStack, diagnostics)) {
          this.removeNodeFromStack(tagsValidationStack, diagnostics, iteratingNode);
        }
        break;
      case TAG_NODE_NAMES.startCloseNode:
        if (this.validateStartCloseNode(iteratingNode, sequenceValidationStack, diagnostics)) {
          this.removeNodeFromStack(tagsValidationStack, diagnostics, iteratingNode);
        }
        break;
      case TAG_NODE_NAMES.tagName:
        this.removeNodeFromStack(tagsValidationStack, diagnostics, iteratingNode);
        break;
      case TAG_NODE_NAMES.endNode:
        this.removeNodeFromStack(tagsValidationStack, diagnostics, iteratingNode);
        this.validateElementNodes(tagsValidationStack, diagnostics);
        tagsValidationStack.pop();
        break;
      case TAG_NODE_NAMES.selfClosingEndNode:
        this.removeNodeFromStack(tagsValidationStack, diagnostics, iteratingNode);
        this.validateElementNodes(tagsValidationStack, diagnostics);
        tagsValidationStack.pop();
        break;
      case TAG_NODE_NAMES.mismatchedCloseNode:
        this.addValidationError(PARSING_ERRORS.mismatchedCloseTag, iteratingNode.from, iteratingNode.to, diagnostics);
        break;
      case TAG_NODE_NAMES.unexpectedParsingError:
        this.addValidationError(PARSING_ERRORS.unexpectedParsingError, iteratingNode.from, iteratingNode.to, diagnostics);
        break;
    }
  }

  validateTextNode(iteratingNode: SyntaxNodeRef, diagnostics: Diagnostic[], view: EditorView) {
    let text = this.getNodeAsString(view, iteratingNode.from, iteratingNode.to);

    if(!text) return;

    if (text.trim() === '') {
      return;
    }

    const nonWhitespaceIndexs = this.findNonWhitespaceIndexs(text);

    const from = nonWhitespaceIndexs.firstNonWhitespaceIndex === -1
      ? iteratingNode.from
      : iteratingNode.from + nonWhitespaceIndexs.firstNonWhitespaceIndex;
    const to = nonWhitespaceIndexs.lastNonWhitespaceIndex === -1
      ? iteratingNode.to
      : iteratingNode.from + nonWhitespaceIndexs.lastNonWhitespaceIndex;

    this.addValidationError(PARSING_ERRORS.unwantedText, from, to, diagnostics);
  }

  findNonWhitespaceIndexs(text: string): { firstNonWhitespaceIndex: number; lastNonWhitespaceIndex: number; } {
    let firstNonWhitespaceIndex = -1;
    let lastNonWhitespaceIndex = -1;

    for (let i = 0; i < text.length; i++) {
      if (!this.isSpace(text.charCodeAt(i)) && firstNonWhitespaceIndex === -1) {
        firstNonWhitespaceIndex = i;
      }
      if (firstNonWhitespaceIndex > -1 && !this.isSpace(text.charCodeAt(i))) {
        lastNonWhitespaceIndex = i + 1;
      }
    }

    return { firstNonWhitespaceIndex, lastNonWhitespaceIndex };
  }

  isSpace(ch: number): boolean {
    return ch === 9 || ch === 10 || ch === 13 || ch === 32;
  }

  validateStartNode(iteratingNode: SyntaxNodeRef, sequenceValidationStack: string[], diagnostics: Diagnostic[]): boolean {

    if (sequenceValidationStack.length === 0) {
      this.addValidationError(PARSING_ERRORS.unexpectedParsingError, iteratingNode.from, iteratingNode.to, diagnostics);
      return false;
    }

    let expectedNodeName = sequenceValidationStack.at(-1)

    if (expectedNodeName === TAG_NODE_NAMES.openTag || expectedNodeName === TAG_NODE_NAMES.selfClosingTag) {
      sequenceValidationStack.pop();
      return true;
    }

    this.addValidationError(PARSING_ERRORS.genericTagError, iteratingNode.from, iteratingNode.to, diagnostics);
    return false;
  }

  validateStartCloseNode(iteratingNode: SyntaxNodeRef, sequenceValidationStack: string[], diagnostics: Diagnostic[]): boolean {
    if (sequenceValidationStack.length === 0) {
      this.addValidationError(PARSING_ERRORS.unexpectedParsingError, iteratingNode.from, iteratingNode.to, diagnostics);
      return false;
    }

    let expectedNodeName = sequenceValidationStack.at(-1)

    if (expectedNodeName === TAG_NODE_NAMES.closeTag) {
      sequenceValidationStack.pop();
      return true;
    }

    this.addValidationError(PARSING_ERRORS.genericTagError, iteratingNode.from, iteratingNode.to, diagnostics);
    return false;
  }

  addValidationError(errorMessage: string, from: number, to: number, diagnostics: Diagnostic[]) {
    diagnostics.push({
      from: from,
      to: to,
      severity: 'error',
      message: errorMessage
    });
  }

  validateElementNodes(tagsValidationStack: { mandatoryNodes: string[]; from: number; to: number; }[], diagnostics: Diagnostic[]) {

    if (tagsValidationStack.length === 0) {
      this.addValidationError(PARSING_ERRORS.unexpectedParsingError, 0, 0, diagnostics);
      return;
    }

    let currentTagData = tagsValidationStack.at(-1);

    if (currentTagData.mandatoryNodes.length > 0) {
      currentTagData.mandatoryNodes.forEach(node => {
        switch (node) {
          case TAG_NODE_NAMES.tagName:
            this.addValidationError(PARSING_ERRORS.missingTagName, currentTagData.from, currentTagData.to, diagnostics);
            break;
          default:
            this.addValidationError(PARSING_ERRORS.genericTagError, currentTagData.from, currentTagData.to, diagnostics);
            break;
        }
      });
    }
  }

  removeNodeFromStack(tagsValidationStack: { mandatoryNodes: string[]; from: number; to: number; }[], diagnostics: Diagnostic[], iteratingNode: SyntaxNodeRef) {
    if (tagsValidationStack.length === 0) {
      this.addValidationError(PARSING_ERRORS.genericTagError, 0, 0, diagnostics);
      return;
    }

    let currentTagNodes = tagsValidationStack.at(-1);

    if (currentTagNodes.mandatoryNodes.at(-1) === iteratingNode.name) {
      currentTagNodes.mandatoryNodes.pop();
      return;
    } else {
      this.addValidationError(PARSING_ERRORS.genericTagError, currentTagNodes.from, currentTagNodes.to, diagnostics);
    }
  }

  validateElement(iteratingNode: SyntaxNodeRef, diagnostics: Diagnostic[]) {
    const openingTag = iteratingNode.node.firstChild;
    const closingTag = iteratingNode.node.lastChild;

    if (openingTag.name === TAG_NODE_NAMES.selfClosingTag) {
      return;
    }

    if (!closingTag || closingTag.name !== TAG_NODE_NAMES.closeTag) {
      this.addValidationError(PARSING_ERRORS.missingClosingTag, openingTag.from, openingTag.to, diagnostics);
    }
  }

  addElementNodesToStack(elementNode: SyntaxNodeRef, tagsValidationStack: { mandatoryNodes: string[]; from: number; to: number; }[]) {
    const openingTag = elementNode.node.firstChild;
    const closingTag = elementNode.node.lastChild;

    if (openingTag.name === TAG_NODE_NAMES.selfClosingTag && closingTag.name === TAG_NODE_NAMES.selfClosingTag) {
      tagsValidationStack.push({
        mandatoryNodes: [...TAG_NODES.selfClosingTagNodes],
        from: openingTag.from,
        to: openingTag.to
      });
      return;
    }

    tagsValidationStack.push({
      mandatoryNodes: [...TAG_NODES.closeTagNodes],
      from: closingTag.from,
      to: closingTag.to
    });

    tagsValidationStack.push({
      mandatoryNodes: [...TAG_NODES.openTagNodes],
      from: openingTag.from,
      to: openingTag.to
    });
  }

  getNodeAsString(view: EditorView, from: number | undefined, to: number | undefined): string | undefined {
    if (!from || !to) return undefined;
    return view.state.sliceDoc(from, to);
  }
}
