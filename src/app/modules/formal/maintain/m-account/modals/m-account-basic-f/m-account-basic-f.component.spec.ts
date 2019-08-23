import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAccountBasicFComponent } from './m-account-basic-f.component';

describe('MAccountBasicFComponent', () => {
  let component: MAccountBasicFComponent;
  let fixture: ComponentFixture<MAccountBasicFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAccountBasicFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAccountBasicFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
