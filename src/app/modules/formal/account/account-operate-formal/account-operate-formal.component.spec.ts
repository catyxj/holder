import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOperateFormalComponent } from './account-operate-formal.component';

describe('AccountOperateFormalComponent', () => {
  let component: AccountOperateFormalComponent;
  let fixture: ComponentFixture<AccountOperateFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOperateFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOperateFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
