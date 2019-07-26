import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowOperateAdComponent } from './flow-operate-ad.component';

describe('FlowOperateAdComponent', () => {
  let component: FlowOperateAdComponent;
  let fixture: ComponentFixture<FlowOperateAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowOperateAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowOperateAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
