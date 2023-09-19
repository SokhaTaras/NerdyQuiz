import { TestBed } from '@angular/core/testing';

import { ModalRefFacadeService } from '@a-shared/services/modal-ref-facade/modal-ref-facade.service';

describe('ModalRefFacadeService', () => {
  let service: ModalRefFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalRefFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
