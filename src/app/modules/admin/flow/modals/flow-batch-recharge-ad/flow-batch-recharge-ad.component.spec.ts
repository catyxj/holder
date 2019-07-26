import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowBatchRechargeAdComponent } from './flow-batch-recharge-ad.component';

describe('FlowBatchRechargeAdComponent', () => {
  let component: FlowBatchRechargeAdComponent;
  let fixture: ComponentFixture<FlowBatchRechargeAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowBatchRechargeAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowBatchRechargeAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
