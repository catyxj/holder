import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAccountProductFComponent } from './m-account-product-f.component';

describe('MAccountProductFComponent', () => {
  let component: MAccountProductFComponent;
  let fixture: ComponentFixture<MAccountProductFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAccountProductFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAccountProductFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
