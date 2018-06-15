import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerInfoComponent } from './boiler-info.component';

describe('BoilerInfoComponent', () => {
  let component: BoilerInfoComponent;
  let fixture: ComponentFixture<BoilerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
