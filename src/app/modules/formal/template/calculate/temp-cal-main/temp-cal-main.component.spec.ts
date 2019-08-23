import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempCalMainComponent } from './temp-cal-main.component';

describe('TempCalMainComponent', () => {
  let component: TempCalMainComponent;
  let fixture: ComponentFixture<TempCalMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempCalMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempCalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
