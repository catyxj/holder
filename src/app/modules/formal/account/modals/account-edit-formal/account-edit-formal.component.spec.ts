import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditFormalComponent } from './account-edit-formal.component';

describe('AccountEditFormalComponent', () => {
  let component: AccountEditFormalComponent;
  let fixture: ComponentFixture<AccountEditFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountEditFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEditFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
