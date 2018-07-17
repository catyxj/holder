import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeConfigComponent } from './range-config.component';

describe('RangeConfigComponent', () => {
  let component: RangeConfigComponent;
  let fixture: ComponentFixture<RangeConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
