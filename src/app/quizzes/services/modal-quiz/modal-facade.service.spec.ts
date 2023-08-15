import { TestBed } from '@angular/core/testing';

import { ModalQuizService } from './modal-quiz.service';

describe('ModalQuizService', () => {
  let service: ModalQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
