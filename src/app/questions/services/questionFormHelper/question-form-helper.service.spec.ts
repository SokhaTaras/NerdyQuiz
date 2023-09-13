import { TestBed } from '@angular/core/testing';

import { QuestionFormHelperService } from './question-form-helper.service';

describe('QuestionFormHelperService', () => {
  let service: QuestionFormHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionFormHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
