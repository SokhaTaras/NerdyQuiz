import { StorageError } from '@a-shared/classes/storageError/storage-error';

describe('StorageError', () => {
  it('should create an instance', () => {
    expect(new StorageError('mock')).toBeTruthy();
  });
});
