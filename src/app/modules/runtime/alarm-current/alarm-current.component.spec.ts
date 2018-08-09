import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmCurrentComponent } from './alarm-current.component';

describe('AlarmCurrentComponent', () => {
  let component: AlarmCurrentComponent;
  let fixture: ComponentFixture<AlarmCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
