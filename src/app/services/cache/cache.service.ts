import { Injectable } from '@angular/core';
import { IBaseCache } from './base-cache';
import { SessionStorageCache } from './session-storage-cache';

@Injectable({
  providedIn: 'root'
})
export class CacheService implements IBaseCache {
  private storageProvider!: IBaseCache

  constructor() {
    this.storageProvider = new SessionStorageCache()
  }

  setStorageProvider(storageProvider: IBaseCache): void {
    this.storageProvider = storageProvider
  }
  
  setItem(url: string, data: string): void {
    this.storageProvider.setItem(url, data)
  }
  getItem(url: string): string | null {
    return this.storageProvider.getItem(url)
  }
  removeItem(url: string): void {
    this.storageProvider.removeItem(url)
  }
  clear(): void {
    this.storageProvider.clear()
  }

  clearAll():void{
    sessionStorage.clear()
    localStorage.clear()
  }
}
