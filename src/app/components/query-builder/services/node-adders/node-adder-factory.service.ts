import { Injectable } from '@angular/core';
import { INodeAdder } from './abstract/i-node-adder';
import { QueryAdders } from '../../models/constants/query-adders';
import { RootNodeAdder } from './root-node-adder';
import { FilterNodeAdder } from './filter-node-adder';
import { DefaultNodeAdder } from './default-node-adder';
import { NodeFactoryService } from '../nodes-factory.service';

@Injectable({ providedIn: 'root' })
export class NodeAdderFactoryService {

  

  constructor(private nodeFactory: NodeFactoryService) { }

  getAdder(type: string): INodeAdder {
    switch (type) {
      case QueryAdders.ROOT_ADDER:
        return new RootNodeAdder(this.nodeFactory);
      case QueryAdders.FILTER_ADDER:
        return new FilterNodeAdder(this.nodeFactory);
      default:
        return new DefaultNodeAdder(this.nodeFactory);
    }
  }
}
