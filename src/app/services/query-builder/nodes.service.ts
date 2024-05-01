import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QueryNode } from 'src/app/models/query-builder/query-node';

@Injectable({ providedIn: 'root' })
export class NodesService {
  dataChange = new BehaviorSubject<QueryNode[]>([]);

  get data(): QueryNode[] { return this.dataChange.value }

  generateUniqueTreeId(): string {
    return `tree-${new Date().getTime().toString()}`
  }

  generateUniqueNodeId(): string {
    return `node-${new Date().getTime().toString()}`
  }
}
