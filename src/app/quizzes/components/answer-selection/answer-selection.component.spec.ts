import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerSelectionComponent } from './answer-selection.component';

describe('AnswerSelectionComponent', () => {
  let component: AnswerSelectionComponent;
  let fixture: ComponentFixture<AnswerSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
