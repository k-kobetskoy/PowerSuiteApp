import { Injectable, OnDestroy} from '@angular/core';
import { QueryNodeTree } from '../models/query-node-tree';
import { BehaviorSubject, Observable, Subject, combineLatest, distinctUntilChanged, map, of, switchMap, takeUntil } from 'rxjs';
import { IQueryNode } from '../models/abstract/i-query-node';
import { EventBusService } from 'src/app/services/event-bus/event-bus.service';
import { AppEvents } from 'src/app/services/event-bus/app-events';

export class ClosingTagsStack {
  private store: string[] = [];

  count: number = 0;

  push(tagName: string): void {
    this.count = this.store.unshift(tagName);
  }

  pop(): string {
    const poppedValue = this.store.shift();
    this.count--;
    return poppedValue;
  }
}

@Injectable({ providedIn: 'root' })
export class QueryRenderService implements OnDestroy {
  private _destroy$ = new Subject<void>();
  private _previousNodeLevel: number = -1;
  private _closingTagsStack = new ClosingTagsStack();
  private _currentNode: IQueryNode;
  private _previousNodeIsExpandable: boolean = false;

  constructor(private queryTree: QueryNodeTree, private eventBus: EventBusService) { 
    this.eventBus.on(AppEvents.NODE_ADDED, () => this.renderXmlRequest());
    this.eventBus.on(AppEvents.NODE_REMOVED, () => this.renderXmlRequest());
  }

  renderXmlRequest() {
    this._destroy$.next();
    this._previousNodeLevel = -1;
    this._currentNode = this.queryTree.root;

    const observables$: Observable<string>[] = [];
    const dynamicObservables$: BehaviorSubject<Observable<string>[]> = new BehaviorSubject([]);

    while (this._currentNode != null || this._closingTagsStack.count != 0) {
      observables$.push(this.processNode(this._currentNode));
    }

    dynamicObservables$.next(observables$);

    dynamicObservables$.pipe(
      switchMap(obsList => combineLatest(obsList)),
      map(values => values.join('\n')),
      distinctUntilChanged(),
      takeUntil(this._destroy$))
      .subscribe(value => this.queryTree.xmlRequest$.next(value));
  }

  processNode(node: IQueryNode): Observable<string> {
    if (this._currentNode === null) {
      return of(this._closingTagsStack.pop());
    }

    if (this._previousNodeLevel >= node.level && this._previousNodeIsExpandable) {
      this._previousNodeLevel--;
      return of(this._closingTagsStack.pop());
    }

    const observable = this.getNodeTag(node);
    this._previousNodeLevel = node.level;
    this._currentNode = node.next;
    this._previousNodeIsExpandable = node.expandable;
    return observable;
  }

  getNodeTag(node: IQueryNode): Observable<string> {
    if (node.expandable) {
      this._closingTagsStack.push(`</${node.tagProperties.tagName}>`);
    }

    return node.displayValue$.pipe(map(displayValue =>
      node.expandable ? `<${displayValue.tagPropertyDisplay}>` : `<${displayValue.tagPropertyDisplay}/>`
    ));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
