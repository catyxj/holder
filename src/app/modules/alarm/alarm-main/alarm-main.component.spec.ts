import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmMainComponent } from './alarm-main.component';

describe('AlarmMainComponent', () => {
  let component: AlarmMainComponent;
  let fixture: ComponentFixture<AlarmMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
