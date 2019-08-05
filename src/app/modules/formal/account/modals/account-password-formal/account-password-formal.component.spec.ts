import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPasswordFormalComponent } from './account-password-formal.component';

describe('AccountPasswordFormalComponent', () => {
  let component: AccountPasswordFormalComponent;
  let fixture: ComponentFixture<AccountPasswordFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPasswordFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPasswordFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
