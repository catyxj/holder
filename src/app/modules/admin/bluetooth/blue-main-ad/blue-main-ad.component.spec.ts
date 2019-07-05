import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueMainAdComponent } from './blue-main-ad.component';

describe('BlueMainAdComponent', () => {
  let component: BlueMainAdComponent;
  let fixture: ComponentFixture<BlueMainAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueMainAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueMainAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
