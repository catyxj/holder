import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqAddressEditComponent } from './eq-address-edit.component';

describe('EqAddressEditComponent', () => {
  let component: EqAddressEditComponent;
  let fixture: ComponentFixture<EqAddressEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqAddressEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqAddressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
