import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfoFormalComponent } from './account-info-formal.component';

describe('AccountInfoFormalComponent', () => {
  let component: AccountInfoFormalComponent;
  let fixture: ComponentFixture<AccountInfoFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountInfoFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInfoFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
