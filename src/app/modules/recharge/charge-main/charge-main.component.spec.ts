import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeMainComponent } from './charge-main.component';

describe('ChargeMainComponent', () => {
  let component: ChargeMainComponent;
  let fixture: ComponentFixture<ChargeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
