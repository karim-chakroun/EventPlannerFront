import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalEventsComponent } from './global-events.component';

describe('GlobalEventsComponent', () => {
  let component: GlobalEventsComponent;
  let fixture: ComponentFixture<GlobalEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
