import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueBindComponent } from './blue-bind.component';

describe('BlueBindComponent', () => {
  let component: BlueBindComponent;
  let fixture: ComponentFixture<BlueBindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueBindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueBindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
