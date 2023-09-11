import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePlayComponent } from './pre-play.component';

describe('PrePlayComponent', () => {
  let component: PrePlayComponent;
  let fixture: ComponentFixture<PrePlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrePlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
