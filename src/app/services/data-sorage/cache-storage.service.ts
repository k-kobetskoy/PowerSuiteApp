import { Injectable } from '@angular/core';
import { IDataStorageService } from './abstract/i-data-storage-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class CacheStorageService implements IDataStorageService {

  constructor() { }

  getItem<T>(key: string): BehaviorSubject<T> {
    let item$ = this[key];
    if (!item$) {
      item$ = new BehaviorSubject<T>(null);
      this[key] = item$;
    }
    return item$;
  }

  setItem<T>(item: T, key: string): void {

    let subject$: BehaviorSubject<T> = this[key];

    if (!subject$) {
      this[key] = new BehaviorSubject<T>(item);
      return;
    }

    subject$.next(item);
  }

  removeItem(key: string): void {
    delete this[key];
  }

  clear(): void {
    for (const key of Object.keys(this)) {
      delete this[key];
    }
  }
}
