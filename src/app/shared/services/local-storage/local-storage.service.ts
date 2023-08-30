import { Injectable } from '@angular/core';

import { StorageError } from '../../classes/storageError/storage-error';
import { STORAGE_ERROR_MESSAGE } from '../../enums/storageErrorMessage';

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

  getLocalStorageData(key: string): string {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      throw new StorageError(STORAGE_ERROR_MESSAGE.GET_DATA);
    }
  }

  setLocalStorageData(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      throw new StorageError(STORAGE_ERROR_MESSAGE.SET_DATA);
    }
  }
}
