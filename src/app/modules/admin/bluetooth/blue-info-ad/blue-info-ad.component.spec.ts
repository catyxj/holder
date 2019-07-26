import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueInfoAdComponent } from './blue-info-ad.component';

describe('BlueInfoAdComponent', () => {
  let component: BlueInfoAdComponent;
  let fixture: ComponentFixture<BlueInfoAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueInfoAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueInfoAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
