import { ParsingHelperService } from './parsing-helper.service';
import { Injectable } from '@angular/core';
import { SyntaxNodeRef } from '@lezer/common';
import { Diagnostic } from "@codemirror/lint";
import { QueryNodeTree } from '../../models/query-node-tree';
import { IQueryNode } from '../../models/abstract/i-query-node';
import { NodeFactoryService } from '../nodes-factory.service';
import { EditorView } from 'codemirror';
import { QueryNodeBuilderService } from './query-node-builder.service';

export const TAG_NODE_NAMES = {
  openTag: 'OpenTag',
  closeTag: 'CloseTag',
  startTag: 'StartTag',
  startCloseNode: 'StartCloseTag',
  tagName: 'TagName',
  endTag: 'EndTag',
  attributeName: 'AttributeName',
  attributeValue: 'AttributeValue',
  text: 'Text',
  selfClosingTag: 'SelfClosingTag',
  selfClosingEndNode: 'SelfCloseEndTag',
  element: 'Element',
  mismatchedCloseNode: 'MismatchedCloseTag',
  unexpectedParsingError: '⚠'
};

@Injectable({ providedIn: 'root' })
export class XmlParseService {

  nodeTree = new QueryNodeTree();
  isExpanded: boolean = false;
  nodeLevel: number = -1;
  from: number;
  to: number;

  constructor(private parsingHelper: ParsingHelperService, private nodeFactoryService: NodeFactoryService, private tagBuilder: QueryNodeBuilderService) { }

  parseNode(iteratingNode: SyntaxNodeRef, view: EditorView, xmlParseErrors: Diagnostic[]) {
    console.log(iteratingNode.name);
    if(iteratingNode.name === TAG_NODE_NAMES.element){
      console.log(iteratingNode.from, iteratingNode.to);
    }

    switch (iteratingNode.name) {
      case TAG_NODE_NAMES.openTag:
        this.isExpanded = true;
        this.nodeLevel++;        
        break;
      case TAG_NODE_NAMES.selfClosingTag:
        this.isExpanded = false;
        break;
      case TAG_NODE_NAMES.closeTag:
        this.nodeLevel--;
        break;
      case TAG_NODE_NAMES.tagName:
        this.tagBuilder.createQueryNode(this.parsingHelper.getNodeAsString(view, iteratingNode.from, iteratingNode.to), this.isExpanded, this.nodeLevel);
        break;
      case TAG_NODE_NAMES.attributeName:
        this.tagBuilder.setAttributeName(this.parsingHelper.getNodeAsString(view, iteratingNode.from, iteratingNode.to), iteratingNode.from, iteratingNode.to);
        break;
      case TAG_NODE_NAMES.attributeValue:
        this.tagBuilder.setAttributeValue(this.parsingHelper.getNodeAsString(view, iteratingNode.from, iteratingNode.to), iteratingNode.from, iteratingNode.to);
        break;
      case TAG_NODE_NAMES.endTag:
        this.addNodeToTree();
        break;
    }
  }


  addNodeToTree() {
    const node = this.tagBuilder.buildQueryNode();
        
  }

}
