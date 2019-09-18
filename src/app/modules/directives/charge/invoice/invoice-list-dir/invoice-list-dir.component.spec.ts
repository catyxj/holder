import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListDirComponent } from './invoice-list-dir.component';

describe('InvoiceListDirComponent', () => {
  let component: InvoiceListDirComponent;
  let fixture: ComponentFixture<InvoiceListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
