import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizUpdatePopoverComponent } from './quiz-update-popover.component';

describe('QuizUpdatePopoverComponent', () => {
  let component: QuizUpdatePopoverComponent;
  let fixture: ComponentFixture<QuizUpdatePopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizUpdatePopoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizUpdatePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
