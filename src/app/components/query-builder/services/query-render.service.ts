import { Injectable, OnDestroy } from '@angular/core';
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
  xmlRequestSubject$ = new BehaviorSubject<string>('');

  constructor(private queryTree: QueryNodeTree, private eventBus: EventBusService) {
    this.renderXmlRequest();
    this.eventBus.on(AppEvents.NODE_ADDED, () => { this.renderXmlRequest(); console.warn('Node Added') });
  }

  renderXmlRequest() {
    this._destroy$.next();
    this._previousNodeLevel = -1;
    this._currentNode = this.queryTree.root;
    console.warn('Rendering XML Request');

    const observables$: Observable<string>[] = [];
    const dynamicObservables$: BehaviorSubject<Observable<string>[]> = new BehaviorSubject([]);

    while (this._currentNode != null || this._closingTagsStack.count != 0) {
      observables$.push(this.processNode(this._currentNode));
    }
    this._previousNodeLevel = -1;

    dynamicObservables$.next(observables$);

    dynamicObservables$.pipe(
      switchMap(obsList => combineLatest(obsList)),
      map(values => values.join('\n')),
      distinctUntilChanged(),
      takeUntil(this._destroy$))
      .subscribe(value => this.xmlRequestSubject$.next(value));
  }

  processNode(node: IQueryNode): Observable<string> {
    if (this._currentNode === null) {
      this._previousNodeLevel = 0;
      return of(this._closingTagsStack.pop());
    }

    if (this._previousNodeLevel >= node.level) {
      this._previousNodeLevel--;
      return of(this._closingTagsStack.pop());
    }

    const observable = this.getNodeTag(node);
    this._previousNodeLevel = node.level;
    this._currentNode = node.next;
    return observable;
  }

  getNodeTag(node: IQueryNode): Observable<string> {
    if (!node.selfClosingTag) {
      this._closingTagsStack.push(`</${node.tagProperties.tagName}>`);
    }
    return node.displayValue$.pipe(map(displayValue => 
      node.selfClosingTag ? `<${displayValue.tagPropertyDisplay}/>` : `<${displayValue.tagPropertyDisplay}>`
    ));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
