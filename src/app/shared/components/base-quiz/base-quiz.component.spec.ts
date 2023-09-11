import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseQuizComponent } from './base-quiz.component';

describe('BaseQuizComponent', () => {
  let component: BaseQuizComponent;
  let fixture: ComponentFixture<BaseQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
