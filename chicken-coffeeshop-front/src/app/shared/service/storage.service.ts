import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  storageSetItem(keyItem: string, value: string) {
    localStorage.setItem(keyItem, value);
  }

  storageGetItem(keyItem: string) {
    return localStorage.getItem(keyItem);
  }

  storageRemoveItem(keyItem: string) {
    localStorage.removeItem(keyItem);
  }

  storageClear() {
    localStorage.clear();
  }
}
