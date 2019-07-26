import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueBasicConfigAdComponent } from './blue-basic-config-ad.component';

describe('BlueBasicConfigAdComponent', () => {
  let component: BlueBasicConfigAdComponent;
  let fixture: ComponentFixture<BlueBasicConfigAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueBasicConfigAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueBasicConfigAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
