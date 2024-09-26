import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QueryNodeTree } from '../models/query-node-tree';

@Injectable({ providedIn: 'root' })

export class NodeTreeProcessorService {

  private _nodeTree$: BehaviorSubject<QueryNodeTree> = new BehaviorSubject<QueryNodeTree>(null);
  
  public get nodeTree$(): BehaviorSubject<QueryNodeTree> {
    return this._nodeTree$;
  }
  
  public set nodeTree$(value: QueryNodeTree) {
    this._nodeTree$.next(value);
  }

  constructor() { }

  

}
