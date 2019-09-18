import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAccountActiveFComponent } from './m-account-active-f.component';

describe('MAccountActiveFComponent', () => {
  let component: MAccountActiveFComponent;
  let fixture: ComponentFixture<MAccountActiveFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAccountActiveFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAccountActiveFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
