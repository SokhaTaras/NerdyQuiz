import { TestBed } from '@angular/core/testing';

import { QuizHelperService } from './quiz-helper.service';

describe('PlayService', () => {
  let service: QuizHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
