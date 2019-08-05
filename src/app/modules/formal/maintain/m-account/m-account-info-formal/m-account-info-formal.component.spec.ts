import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAccountInfoFormalComponent } from './m-account-info-formal.component';

describe('MAccountInfoFormalComponent', () => {
  let component: MAccountInfoFormalComponent;
  let fixture: ComponentFixture<MAccountInfoFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAccountInfoFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAccountInfoFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
