import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSetFiComponent } from './invoice-set-fi.component';

describe('InvoiceSetFiComponent', () => {
  let component: InvoiceSetFiComponent;
  let fixture: ComponentFixture<InvoiceSetFiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceSetFiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSetFiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
