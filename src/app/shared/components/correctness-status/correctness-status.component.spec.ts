import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectnessStatusComponent } from './correctness-status.component';

describe('CorrectnessComponent', () => {
  let component: CorrectnessStatusComponent;
  let fixture: ComponentFixture<CorrectnessStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorrectnessStatusComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CorrectnessStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
