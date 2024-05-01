import { Injectable } from '@angular/core';
import { IDataStorageService } from './abstract/i-data-storage-service';

@Injectable({ providedIn: 'root', })
export class CacheStorageService implements IDataStorageService {

  private _cache: Map<string, any> = new Map()

  constructor() { }

  getItem<T>(key: string): T {

    if (this._cache.has(key))
      return this._cache.get(key)
    return null
  }
  setItem<T>(item: T, key: string): void {
    this._cache.set(key, item)
  }
  removeItem(key: string): void {
    this._cache.delete(key)
  }
  clear(): void {
    this._cache = new Map()
  }
}
