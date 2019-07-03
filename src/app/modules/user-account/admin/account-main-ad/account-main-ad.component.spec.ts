import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMainAdComponent } from './account-main-ad.component';

describe('AccountMainAdComponent', () => {
  let component: AccountMainAdComponent;
  let fixture: ComponentFixture<AccountMainAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountMainAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMainAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
