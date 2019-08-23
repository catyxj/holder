import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqBasicEditComponent } from './eq-basic-edit.component';

describe('EqBasicEditComponent', () => {
  let component: EqBasicEditComponent;
  let fixture: ComponentFixture<EqBasicEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqBasicEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqBasicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
