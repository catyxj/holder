import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcccountMainComponent } from './acccount-main.component';

describe('AcccountMainComponent', () => {
  let component: AcccountMainComponent;
  let fixture: ComponentFixture<AcccountMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcccountMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcccountMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
