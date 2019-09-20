import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListFiComponent } from './invoice-list-fi.component';

describe('InvoiceListFiComponent', () => {
  let component: InvoiceListFiComponent;
  let fixture: ComponentFixture<InvoiceListFiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceListFiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceListFiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
