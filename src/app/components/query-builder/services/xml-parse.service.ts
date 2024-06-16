import { QueryNodeTags } from './../models/constants/query-node-tags';
import { NodeAdderFactoryService } from './node-adders/node-adder-factory.service';
import { IQueryNode } from 'src/app/components/query-builder/models/abstract/i-query-node';
import { Injectable } from '@angular/core';
import { QueryNodeTree } from '../models/query-node-tree';
import { TagPropertyNameFactoryService } from './tag-property-name-factory.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class XmlParseService {

  private _rootNode: IQueryNode;
  private _closingTagsStack: string[] = [];
  private _xml: string;

  errorsList: BehaviorSubject<string[]> = new BehaviorSubject([]);
  errorHighlighting: BehaviorSubject<{ start: number, end: number }[]> = new BehaviorSubject([]);

  constructor(private queryNodeTree: QueryNodeTree, private tagPropertiesFactoryService: TagPropertyNameFactoryService, private nodeAdderFactoryService: NodeAdderFactoryService) { }

  parse(xml: string) {
    this.errorsList.next([]);
    this.errorHighlighting.next([]);

    if (!xml) {
      return;
    }

    this._xml = xml;

    const tagNodes = this.getTagNodesWithIndices(xml);

    this.processTagNodes(tagNodes);
  }

  getTagNodesWithIndices(xml: string): { tag: string; index: number }[] {
    const tagRegex = /<\/?[^>]+>/g;
    let match: RegExpExecArray | null;
    const tagNodesWithIndices = [];

    while ((match = tagRegex.exec(xml)) !== null) {
      if (!match[0].startsWith("<!--")) {
        tagNodesWithIndices.push({ tag: match[0], index: match.index });
      }
    }

    return tagNodesWithIndices;
  }
  processTagNodes(tagNodes: { tag: string; index: number }[]) {
    if (!tagNodes || tagNodes.length === 0) {
      this.errorsList.next([...this.errorsList.getValue(), 'No tags found in XML']);
      return
    };

    this.validateFirstTwoTags(tagNodes);

    // for (let i = 2; i < tagNodes.length; i++) {
    //   const tagName = this.getTagName(tagNodes[i]);
    //   const tagProperties = this.getTagProperties(tagNodes[i]);
    //   const nameValidationResult = this.validateTagName(tagName, tagNodes[i]);
    //   if (nameValidationResult) {
    //     this.validateProperties(tagName, tagProperties, tagNodes[i]);
    //   }
    // }

  }

  validateTagName(tagName: string, tagNode: { tag: string; index: number }): boolean {
    if (Object.values(QueryNodeTags).includes(tagName as QueryNodeTags) === false) {
      this.errorsList.next([...this.errorsList.value, `Tag ${tagName} is not supported`]);
      const startHighlightIndex = this._xml.indexOf(tagName, tagNode.index);
      const endHighlightIndex = startHighlightIndex + tagName.length;
      this.errorHighlighting.next([...this.errorHighlighting.value, { start: startHighlightIndex, end: endHighlightIndex }]);
      return false;
    }
    return true;
  }

  validateProperties(tagName: string, tagProperties: { [key: string]: string; }, tagNode: { tag: string; index: number }): boolean {
    let result = true;
    const supportedProperties = this.tagPropertiesFactoryService.getTagProperties(tagName);
    Object.keys(tagProperties).forEach(property => {
      if (!supportedProperties.includes(property)) {
        `<!-- Property ${property} is not supported for tag ${tagName} -->`;
        result = false;
      }
    });
    return result;
  }


  validateFirstTwoTags(tagNodes: { tag: string; index: number }[]) {
    const rootTagName = this.getTagName(tagNodes[0].tag);
    if (rootTagName === QueryNodeTags.ROOT) {
      const rootTagProperties = this.getTagProperties(rootTagName);
      if (rootTagProperties) {
        this.validateProperties(rootTagName, rootTagProperties, tagNodes[0]);
      }
    } else {
      this.errorsList.next([...this.errorsList.getValue(), `First tag must be <fetch>`]);
      const startHighlightIndex = tagNodes[0].index;
      const endHighlightIndex = startHighlightIndex + tagNodes[0].tag.length;
      this.errorHighlighting.next([...this.errorHighlighting.value, { start: startHighlightIndex, end: endHighlightIndex }]);
    }





    // const entityTagName = this.getTagName(tags[1]);
    // if (entityTagName !== 'entity') {
    //   tags[1] = `<!-- Second tag must be <entity> :) -->\n${tags[1]}`;
    // }
  }

  getTagProperties(tagNode: string): { [key: string]: string } {
    const properties: { [key: string]: string } = {};

    const attributeRegex = /(\w+)=["']([^"']*)["']/g;
    let match;
    while ((match = attributeRegex.exec(tagNode)) !== null) {
      const [_, key, value] = match;
      properties[key] = value;
    }
    return properties;
  }

  getTagName(tagNode: string) {
    const match = tagNode.match(/<([^ >]*)/);
    return match ? match[1] : '';
  }

  // validate(xml: string): { isValid: boolean, errors: string[] } {
  //   const errors: string[] = [];
  //   const tagStack: { tag: string, position: { line: number, column: number } }[] = [];
  //   let line = 1;
  //   let column = 1;

  //   const tagRegex = /<([^>]+)>/g;
  //   let match;
  //   while ((match = tagRegex.exec(xml)) !== null) {
  //     const tagContent = match[1];
  //     const isClosingTag = tagContent.startsWith('/');
  //     const isOpeningTag = !isClosingTag && !tagContent.endsWith('/');
  //     const tagName = isClosingTag ? tagContent.slice(1) : tagContent;

  //     if (isOpeningTag) {
  //       tagStack.push({ tag: tagName, position: { line, column: match.index } });
  //     } else if (isClosingTag) {
  //       if (tagStack.length === 0 || tagStack[tagStack.length - 1].tag !== tagName) {
  //         errors.push(`Mismatched tag found at line ${line}, column ${column}. Expected closing tag for ${tagStack[tagStack.length - 1]?.tag || "unknown"}, found closing tag for ${tagName}`);
  //       } else {
  //         tagStack.pop();
  //       }
  //     }

  //     // Update line and column numbers
  //     const lines = match[0].split('\n');
  //     line += lines.length - 1;
  //     column = lines.length > 1 ? lines[lines.length - 1].length : column + match[0].length;
  //   }

  //   if (tagStack.length > 0) {
  //     tagStack.forEach(tag => {
  //       errors.push(`Unclosed tag ${tag.tag} found at line ${tag.position.line}, column ${tag.position.column}`);
  //     });
  //   }

  //   return {
  //     isValid: errors.length === 0,
  //     errors
  //   };
  // }

}
