import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerMainComponent } from './boiler-main.component';

describe('BoilerMainComponent', () => {
  let component: BoilerMainComponent;
  let fixture: ComponentFixture<BoilerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilerMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
