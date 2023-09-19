import { TestBed } from '@angular/core/testing';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';

describe('QuizStateService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
