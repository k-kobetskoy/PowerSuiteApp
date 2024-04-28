import { Injectable } from '@angular/core';
import { IDataStorageService } from './Idata-storage-service';

@Injectable({ providedIn: 'root', })
export class CacheStorageService implements IDataStorageService {

  private _cache: Map<string, any> = new Map()

  constructor() { }

  getItem<T>(key: string): T {
    return this._cache.get(key)
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
