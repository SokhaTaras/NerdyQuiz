import { TestBed } from '@angular/core/testing';

import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
