import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowChargeInlineAdComponent } from './flow-charge-inline-ad.component';

describe('FlowChargeInlineAdComponent', () => {
  let component: FlowChargeInlineAdComponent;
  let fixture: ComponentFixture<FlowChargeInlineAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowChargeInlineAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowChargeInlineAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
