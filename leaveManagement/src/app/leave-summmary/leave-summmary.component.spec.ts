import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSummmaryComponent } from './leave-summmary.component';

describe('LeaveSummmaryComponent', () => {
  let component: LeaveSummmaryComponent;
  let fixture: ComponentFixture<LeaveSummmaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveSummmaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveSummmaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
