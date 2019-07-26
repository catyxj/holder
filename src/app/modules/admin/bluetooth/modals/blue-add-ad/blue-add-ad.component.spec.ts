import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueAddAdComponent } from './blue-add-ad.component';

describe('BlueAddAdComponent', () => {
  let component: BlueAddAdComponent;
  let fixture: ComponentFixture<BlueAddAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueAddAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueAddAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
