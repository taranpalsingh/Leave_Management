import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewLeavesComponent } from './review-leaves.component';

describe('ReviewLeavesComponent', () => {
  let component: ReviewLeavesComponent;
  let fixture: ComponentFixture<ReviewLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
