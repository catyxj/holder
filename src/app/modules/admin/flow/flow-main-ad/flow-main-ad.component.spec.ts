import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowMainAdComponent } from './flow-main-ad.component';

describe('FlowMainAdComponent', () => {
  let component: FlowMainAdComponent;
  let fixture: ComponentFixture<FlowMainAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowMainAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowMainAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
