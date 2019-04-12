import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLinksComponent } from './main-links.component';

describe('MainLinksComponent', () => {
  let component: MainLinksComponent;
  let fixture: ComponentFixture<MainLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
