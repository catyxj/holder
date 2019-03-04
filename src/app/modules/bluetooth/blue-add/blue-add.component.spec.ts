import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueAddComponent } from './blue-add.component';

describe('BlueAddComponent', () => {
  let component: BlueAddComponent;
  let fixture: ComponentFixture<BlueAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
