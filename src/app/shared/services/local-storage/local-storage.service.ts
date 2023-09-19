import { Injectable } from '@angular/core';

import { STORAGE_ERROR_MESSAGE } from '@a-shared/enums/storageErrorMessage';
import { StorageError } from '@a-shared/classes/storageError/storage-error';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  updateLocalStorage(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new StorageError(STORAGE_ERROR_MESSAGE.STRINGIFY);
    }
  }

  getStringifiedData(key: string): string {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      throw new StorageError(STORAGE_ERROR_MESSAGE.GET_DATA);
    }
  }

  getParsedData(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setLocalStorageData(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      throw new StorageError(STORAGE_ERROR_MESSAGE.SET_DATA);
    }
  }
}
