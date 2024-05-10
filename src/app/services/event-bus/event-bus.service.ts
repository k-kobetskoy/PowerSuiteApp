import { Injectable } from '@angular/core';
import { EventData } from './event-data';
import { ReplaySubject, Subject, Subscription, filter, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EventBusService {
  private _subject$ = new Subject<EventData>()
  private _replaySubject$ = new ReplaySubject<EventData>(1)

  constructor() { }

  emit(event: EventData) {
    this._subject$.next(event)
  }
  emitAndSaveLast(event: EventData){
    this._replaySubject$.next(event)
  }

  on(eventName: string, action: any): Subscription {
    return this._subject$.pipe(
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e.value)).subscribe(action)
  }

  onLast(eventName: string, action: any): Subscription {
    return this._replaySubject$.pipe(
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e.value)).subscribe(action)
  }
}
