import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { AppState } from '@a-store/state/app.state';

describe('StoreService', () => {
  let service: StoreService<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
