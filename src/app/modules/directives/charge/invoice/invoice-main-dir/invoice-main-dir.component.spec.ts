import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceMainDirComponent } from './invoice-main-dir.component';

describe('InvoiceMainDirComponent', () => {
  let component: InvoiceMainDirComponent;
  let fixture: ComponentFixture<InvoiceMainDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceMainDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceMainDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
