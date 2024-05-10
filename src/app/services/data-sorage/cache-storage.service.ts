import { Injectable } from '@angular/core';
import { IDataStorageService } from './abstract/i-data-storage-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class CacheStorageService implements IDataStorageService {

  private _cache: Map<string, any>

  constructor() {
    this._cache = new Map()
  }

  getItem<T>(key: string): BehaviorSubject<T> {
    let item$ = this._cache.get(key);
    if (!item$) {
      item$ = new BehaviorSubject<T>(null);
      this._cache.set(key, item$);

    }
    return item$;
  }
  setItem<T>(item: T, key: string): void {

    let subject$: BehaviorSubject<T> = this._cache.get(key);

    if(!subject$) {
      this._cache.set(key, new BehaviorSubject<T>(item));
      return;
    }

    subject$.next(item);
  }

  // getItem<T>(key: string): T {
  //   let item = this._cache.get(key)

  //   return item ? item : null
  // }
  // setItem<T>(item: T, key: string): void {
  //   this._cache.set(key, item)
  // }

  removeItem(key: string): void {
    this._cache.delete(key)
  }

  clear(): void {
    this._cache = new Map()
  }
}
