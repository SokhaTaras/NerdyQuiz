import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectnessIndicatorComponent } from './correctness-indicator.component';

describe('CorrectnessComponent', () => {
  let component: CorrectnessIndicatorComponent;
  let fixture: ComponentFixture<CorrectnessIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorrectnessIndicatorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CorrectnessIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
