import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressEditInvioceDirComponent } from './address-edit-invioce-dir.component';

describe('AddressEditInvioceDirComponent', () => {
  let component: AddressEditInvioceDirComponent;
  let fixture: ComponentFixture<AddressEditInvioceDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressEditInvioceDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressEditInvioceDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
