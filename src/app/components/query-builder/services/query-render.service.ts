import { Injectable } from '@angular/core';
import { QueryNodeTree } from '../models/query-node-tree';
import { BehaviorSubject, Observable, combineLatest, concatMap, from, map, merge, of, reduce, scan, switchMap, tap } from 'rxjs';
import { IQueryNode } from '../models/abstract/i-query-node';
import { EventBusService } from 'src/app/services/event-bus/event-bus.service';
import { AppEvents } from 'src/app/services/event-bus/app-events';

export class ClosingTagsStack {
  store: string[] = [];

  push(tagName: string): void {
    this.store.unshift(tagName);
  }
  pop(): string {
    return this.store.shift();
  }
}

@Injectable({ providedIn: 'root' })
export class QueryRenderService {

  private _closingTags: ClosingTagsStack = new ClosingTagsStack();
  private _previousNodeLevel: number = -1;
  private _restClosingTags$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  xmlRequest$: Observable<string>;


  queryTree$ = new BehaviorSubject(this.queryTree);

  constructor(private queryTree: QueryNodeTree, private eventBus: EventBusService) {

    this.renderXmlRequest();
    this.eventBus.on(AppEvents.NODE_ADDED, () => { console.warn('eventBus NODE_ADDED'); this.renderXmlRequest() });
  }


  renderXmlRequest() {

    this.queryTree$.next(this.queryTree);
    //let observables: Observable<string>[] = [];

    // for (let node of this.queryTree) {
    //   observables.push(node.displayValue$.pipe(map(value => {
    //     return !node.selfClosingTag ? this.getPairNode(node, value) : this.getSingleNode(node, value)
    //   })));
    // }

 
      // this.xmlRequest$ = from(this.queryTree).pipe(
      //     concatMap(node => node.displayValue$.pipe(
      //         map(displayValue => !node.selfClosingTag ? this.getPairNode(node, displayValue) : this.getSingleNode(node, displayValue))
      //     )),
      //     reduce((acc, xmlString) => acc + xmlString, ''),
      //     tap(xmlString => console.log(xmlString))
      // );


      this.xmlRequest$ = this.queryTree$.pipe(
        switchMap(queryTree => from(queryTree).pipe(
            map(node => node.tagProperties.tagName + ' '),
            reduce((acc, xmlString) => acc + xmlString, '')
        ))
    );
    

    //   this.xmlRequest$ = from(this.queryTree).pipe(
    //     map(node=> {
    //       console.log(node.tagProperties.tagName)
    //      return node.tagProperties.tagName + ' '
    //     }),
    //     // concatMap(node => node.displayValue$.pipe(
    //     //     map(displayValue => !node.selfClosingTag ? this.getPairNode(node, displayValue) : this.getSingleNode(node, displayValue))
    //     // )),
    //     reduce((acc, xmlString) =>  acc + xmlString, ''),
    //     // tap(xmlString => console.log(xmlString))
    // );


//  for (let node of this.queryTree) {
//       observables.push(node.displayValue$.pipe(map(value => {
//         return !node.selfClosingTag ? this.getPairNode(node, value) : this.getSingleNode(node, value)
//       })));
//     }

  //   for (let node of this.queryTree) {
  //     observables.push(node.displayValue$.pipe(
  //         scan((acc, value) => {
  //             return !node.selfClosingTag ? this.getPairNode(node, value) : this.getSingleNode(node, value);
  //         }, '')
  //     ));
  // }

    // this.updateRestClosingTags();

    // observables.push(this._restClosingTags$.asObservable());

    // // this.xmlRequest$ = merge(...observables),
    // this.xmlRequest$ = combineLatest(observables).pipe(map(values => values.join('')),
    //   tap());
  }

  getPairNode(node: IQueryNode, value: string): string {
    let closingTag = `</${node.tagProperties.tagName}>`;
    let previousClosingTag = '';
    console.log('getting pair node')

    if (this._previousNodeLevel >= node.level) {
      previousClosingTag = this._closingTags.pop();
      console.log('popped from closing tags in getPairNode() ' + previousClosingTag);
    } else if (previousClosingTag) {
      this._closingTags.push(previousClosingTag);
    }
    this._closingTags.push(closingTag);
    //this.updateRestClosingTags();
    this._previousNodeLevel = node.level;

    return `<${previousClosingTag} ${node.tagProperties.tagName} ${value}>`;
  }

  // getPairNode(node: IQueryNode, value: Observable<string>): Observable<string> {
  //   let closingTag = `</${node.tagProperties.tagName}>`;
  //   let previousClosingTag = '';

  //   return value.pipe(
  //     map(value => {
  //       if (this._previousNodeLevel >= node.level) {
  //         previousClosingTag = this._closingTags.pop();
  //         console.log('popped from closing tags in getPairNode() ' + previousClosingTag);
  //       }
  //       this._closingTags.push(closingTag);
  //       //this.updateRestClosingTags();
  //       return `<${previousClosingTag} ${node.tagProperties.tagName} ${value}>`;

  //     }), tap(_ => {
  //       this._previousNodeLevel = node.level
  //     }));
  // }


  getSingleNode(node: IQueryNode, value: string): string {
    let previousClosingTag = '';

    if (this._previousNodeLevel >= node.level) {
      previousClosingTag = this._closingTags.pop();
      console.log('popped from closing tags in getSingleNode() ' + previousClosingTag);
    } else if (previousClosingTag) {
      this._closingTags.push(previousClosingTag);
    }
    this._previousNodeLevel = node.level;

    return `${previousClosingTag} <${node.tagProperties.tagName} ${value}/>`;
  }
  // getSingleNode(node: IQueryNode, value: Observable<string>): Observable<string> {
  //   let previousClosingTag = '';

  //   return value.pipe(map(value => {
  //     if (this._previousNodeLevel >= node.level) {
  //       previousClosingTag = this._closingTags.pop();
  //       console.log('popped from closing tags in getSingleNode() ' + previousClosingTag);
  //     }
  //     return `${previousClosingTag} <${node.tagProperties.tagName} ${value}/>`;
  //   }), tap(_ => this._previousNodeLevel = node.level));
  // }

  updateRestClosingTags(): void {
    let closingTags = '';
    let closingTag = this._closingTags.pop();

    while (closingTag) {
      closingTags = closingTags.concat(closingTag);
      closingTag = this._closingTags.pop();
    }
    this._restClosingTags$.next(closingTags);
  }
}
