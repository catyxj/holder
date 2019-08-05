import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderDetailFormalComponent } from './account-order-detail-formal.component';

describe('AccountOrderDetailFormalComponent', () => {
  let component: AccountOrderDetailFormalComponent;
  let fixture: ComponentFixture<AccountOrderDetailFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOrderDetailFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOrderDetailFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
