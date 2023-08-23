import { Injectable } from '@angular/core';
import { StorageKey } from '../../enums/storageKey';
import { StorageError } from '../../classes/storageError/storage-error';
import { StorageErrorMessage } from '../../enums/storageErrorMessage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  updateLocalStorage(value: any): void {
    try {
      localStorage.setItem(StorageKey.QUIZZES, JSON.stringify(value));
    } catch (error) {
      throw new StorageError(StorageErrorMessage.stringify);
    }
  }
}
