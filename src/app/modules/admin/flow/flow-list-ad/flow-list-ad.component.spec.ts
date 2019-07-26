import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowListAdComponent } from './flow-list-ad.component';

describe('FlowListAdComponent', () => {
  let component: FlowListAdComponent;
  let fixture: ComponentFixture<FlowListAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowListAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowListAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
