import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAccountListFormalComponent } from './m-account-list-formal.component';

describe('MAccountListFormalComponent', () => {
  let component: MAccountListFormalComponent;
  let fixture: ComponentFixture<MAccountListFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAccountListFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAccountListFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
