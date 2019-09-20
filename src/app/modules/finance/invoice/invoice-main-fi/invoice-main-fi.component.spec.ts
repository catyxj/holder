import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceMainFiComponent } from './invoice-main-fi.component';

describe('InvoiceMainFiComponent', () => {
  let component: InvoiceMainFiComponent;
  let fixture: ComponentFixture<InvoiceMainFiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceMainFiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceMainFiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
