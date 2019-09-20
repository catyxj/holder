import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceInfoFiComponent } from './invoice-info-fi.component';

describe('InvoiceInfoFiComponent', () => {
  let component: InvoiceInfoFiComponent;
  let fixture: ComponentFixture<InvoiceInfoFiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceInfoFiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceInfoFiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
