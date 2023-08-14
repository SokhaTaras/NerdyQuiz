import { TestBed } from '@angular/core/testing';

import { ModalFacadeService } from './modal-facade.service';

describe('ModalFacadeService', () => {
  let service: ModalFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
