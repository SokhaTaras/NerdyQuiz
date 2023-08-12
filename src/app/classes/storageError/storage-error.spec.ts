import { StorageError } from './storage-error';

describe('StorageError', () => {
  it('should create an instance', () => {
    expect(new StorageError('mock')).toBeTruthy();
  });
});
