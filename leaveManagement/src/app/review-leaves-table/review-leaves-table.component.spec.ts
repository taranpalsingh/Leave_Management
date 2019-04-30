import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewLeavesTableComponent } from './review-leaves-table.component';

describe('ReviewLeavesTableComponent', () => {
  let component: ReviewLeavesTableComponent;
  let fixture: ComponentFixture<ReviewLeavesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewLeavesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewLeavesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
