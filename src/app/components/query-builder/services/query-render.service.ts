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
    this.store = [tagName, ...this.store];
    this.count++;
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
  xmlRequestSubject$ = new BehaviorSubject<string>('');
  node: IQueryNode;

  constructor(private queryTree: QueryNodeTree, private eventBus: EventBusService) {

    this.renderXmlRequest();
    this.eventBus.on(AppEvents.NODE_ADDED, () => { this.renderXmlRequest(); console.warn('Node Added') });
  }

  renderXmlRequest() {
    this._destroy$.next();
    this._previousNodeLevel = -1;
    this.node = this.queryTree.root;
    console.warn('Rendering XML Request');

    const observables$: Observable<string>[] = [];
    const dynamicObservables$: BehaviorSubject<Observable<string>[]> = new BehaviorSubject([]);

    while (this.node != null || this._closingTagsStack.count != 0) {
      observables$.push(this.processNode(this.node));
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
    if (this.node === null) {
      this._previousNodeLevel = 0;
      return of(this._closingTagsStack.pop());
    }

    if (this._previousNodeLevel >= node.level) {
      this._previousNodeLevel--;
      return of(this._closingTagsStack.pop());
    }

    if (node.selfClosingTag) {
      let observable = this.getSingleNodeTag(node);
      this._previousNodeLevel = node.level;
      this.node = node.next;
      return observable;
    }
    else {
      let observable = this.getPairNodeTag(node);
      this._previousNodeLevel = node.level;
      this.node = node.next;
      return observable;
    }
  }

  getPairNodeTag(node: IQueryNode): Observable<string> {
    this._closingTagsStack.push(`</${node.tagProperties.tagName}>`);
    return node.displayValue$.pipe(map(displayValue => `<${node.tagProperties.tagName} ${displayValue}>`))
  }

  getSingleNodeTag(node: IQueryNode): Observable<string> {
    return node.displayValue$.pipe(map(displayValue => `<${node.tagProperties.tagName}/>`))
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
