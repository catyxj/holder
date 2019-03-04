import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueBindEqComponent } from './blue-bind-eq.component';

describe('BlueBindEqComponent', () => {
  let component: BlueBindEqComponent;
  let fixture: ComponentFixture<BlueBindEqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueBindEqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueBindEqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
