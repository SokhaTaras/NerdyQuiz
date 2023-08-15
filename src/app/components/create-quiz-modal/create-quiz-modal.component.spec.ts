import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuizModalComponent } from './create-quiz-modal.component';

describe('InitQuizModalComponent', () => {
  let component: CreateQuizModalComponent;
  let fixture: ComponentFixture<CreateQuizModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateQuizModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateQuizModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
