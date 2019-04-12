import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveLinksComponent } from './leave-links.component';

describe('LeaveLinksComponent', () => {
  let component: LeaveLinksComponent;
  let fixture: ComponentFixture<LeaveLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
