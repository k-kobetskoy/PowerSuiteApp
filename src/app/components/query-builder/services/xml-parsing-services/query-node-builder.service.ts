import { Injectable } from '@angular/core';
import { IQueryNode } from '../../models/abstract/i-query-node';
import { NodeFactoryService } from '../nodes-factory.service';
import { IAttributeTypeValidation, QueryNodeBuilderValidatorService } from './query-node-builder-validator.service';

export interface IQueryNodeBuildResult {
  isBuildSuccess: boolean;
  queryNode: IQueryNode;
  errors: IBuildQueryError[];
}

export interface ITagBuildEntityAttribute {
  name: string;
  value?: string;
  nameFrom: number;
  nameTo: number;
  valueFrom?: number;
  valueTo?: number;
}

export interface IBuildQueryError{
  errorMessage: string;
  from?: number;
  to?: number;
}

export interface ITagBuildEntity{
  tagName: string;
  isExpanded: boolean;
  nodeLevel: number;
  from: number;
  to: number;
}

@Injectable({ providedIn: 'root' })

export class QueryNodeBuilderService {

  constructor(private nodeFactory: NodeFactoryService, private nodeBuilderValidator: QueryNodeBuilderValidatorService) { }

  tag: ITagBuildEntity;
  attribute: ITagBuildEntityAttribute;
  attributes: ITagBuildEntityAttribute[] = [];
  errors: IBuildQueryError[] = [];

  createQueryNode(tagName: string, isExpanded: boolean, nodeLevel: number) {
    this.resetNodeData();
    this.tag = { tagName: tagName, isExpanded: isExpanded, nodeLevel: nodeLevel, from: 0, to: 0 };
  }

  setAttributeName(attributeName: string, from: number, to: number) {
    this.attribute = { name: attributeName, nameFrom: from, nameTo: to };
  }

  setAttributeValue(attributeValue: string, from: number, to: number) {
    if(!this.attribute){      
      return;
    }

    this.attribute.value = attributeValue;
    this.attribute.valueFrom = from;
    this.attribute.valueTo = to;

    this.attributes.push(this.attribute);
    this.attribute = null;
  }

  buildQueryNode(): IQueryNodeBuildResult {       

    if(!this.nodeBuilderValidator.validateTag(this.tag, this.errors)){
      return { isBuildSuccess: false, queryNode: null, errors: this.errors };
    }
    
    let queryNode = this.nodeFactory.getNode(this.tag.tagName);

    if(this.attributes.length > 0){
      for (let attribute of this.attributes) {

        const attributeNameValidationSuccess = this.nodeBuilderValidator.validateAttributeName(attribute, queryNode, this.errors);
        
        if(attributeNameValidationSuccess){
          
          const attributeTypeValidation = this.nodeBuilderValidator.validateAttributeValueType(attribute, queryNode, this.errors);          

          this.addAttributeValueToNode(attribute, queryNode, attributeTypeValidation);
        }
      }
    }

    let buildResult = { isBuildSuccess: false, queryNode: null, errors: this.errors };
    
    buildResult.isBuildSuccess = this.errors.length === 0;
    return buildResult;
  }

  addAttributeValueToNode(attribute: ITagBuildEntityAttribute, queryNode: IQueryNode, attributeTypeValidation: IAttributeTypeValidation) {
    
    let tagProperty = queryNode.tagProperties.getTagPropertyByName(attribute.name);

    if(attributeTypeValidation){
      tagProperty.constructorValue$.next(attribute.value);
    }
    else{
      tagProperty.parsedValue$.next(attribute.value);
      tagProperty.typeValidationPassed$.next(false);
      tagProperty.tagPropertyErrorMessage.next(attributeTypeValidation.errorMessage);
    }
  }

  resetNodeData() {
    this.tag = null;
    this.attribute = null;
    this.attributes = [];
    this.errors = [];
  }
}