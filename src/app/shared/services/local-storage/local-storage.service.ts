import { Injectable } from '@angular/core';

import { StorageError } from '../../classes/storageError/storage-error';
import { StorageErrorMessage } from '../../enums/storageErrorMessage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  updateLocalStorage(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new StorageError(StorageErrorMessage.stringify);
    }
  }
}
