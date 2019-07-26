import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowInfoAdComponent } from './flow-info-ad.component';

describe('FlowInfoAdComponent', () => {
  let component: FlowInfoAdComponent;
  let fixture: ComponentFixture<FlowInfoAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowInfoAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowInfoAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
