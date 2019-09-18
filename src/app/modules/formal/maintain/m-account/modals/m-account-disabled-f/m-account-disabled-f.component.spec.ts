import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAccountDisabledFComponent } from './m-account-disabled-f.component';

describe('MAccountDisabledFComponent', () => {
  let component: MAccountDisabledFComponent;
  let fixture: ComponentFixture<MAccountDisabledFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAccountDisabledFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAccountDisabledFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
