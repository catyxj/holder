import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeMainDirComponent } from './charge-main-dir.component';

describe('ChargeMainDirComponent', () => {
  let component: ChargeMainDirComponent;
  let fixture: ComponentFixture<ChargeMainDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeMainDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeMainDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
