import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerFlowAdComponent } from './ter-flow-ad.component';

describe('TerFlowAdComponent', () => {
  let component: TerFlowAdComponent;
  let fixture: ComponentFixture<TerFlowAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerFlowAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerFlowAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
