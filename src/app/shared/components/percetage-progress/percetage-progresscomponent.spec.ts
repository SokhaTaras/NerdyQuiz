import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercetageProgressComponent } from './percetage-progress.component';

describe('ProgressBarComponent', () => {
  let component: PercetageProgressComponent;
  let fixture: ComponentFixture<PercetageProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PercetageProgressComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PercetageProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
