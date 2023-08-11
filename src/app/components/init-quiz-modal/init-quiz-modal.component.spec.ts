import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitQuizModalComponent } from './init-quiz-modal.component';

describe('InitQuizModalComponent', () => {
  let component: InitQuizModalComponent;
  let fixture: ComponentFixture<InitQuizModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitQuizModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InitQuizModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
