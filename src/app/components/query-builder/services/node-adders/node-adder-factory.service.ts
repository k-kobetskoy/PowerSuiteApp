import { Injectable } from '@angular/core';
import { INodeAdder } from './abstract/i-node-adder';
import { RootNodeAdder } from './root-node-adder';
import { FilterNodeAdder } from './filter-node-adder';
import { DefaultNodeAdder } from './default-node-adder';
import { NodeFactoryService } from '../nodes-factory.service';
import { QueryNodeType } from '../../models/constants/query-node-type';

@Injectable({ providedIn: 'root' })
export class NodeAdderFactoryService {  

  constructor(private nodeFactory: NodeFactoryService) { }

  getAdder(type: string): INodeAdder {
    switch (type) {
      case QueryNodeType.ROOT:
        return new RootNodeAdder(this.nodeFactory);
      case QueryNodeType.FILTER:
        return new FilterNodeAdder(this.nodeFactory);
      default:
        return new DefaultNodeAdder(this.nodeFactory);
    }
  }
}
