import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuntimeCycleComponent } from './runtime-cycle.component';

describe('RuntimeCycleComponent', () => {
  let component: RuntimeCycleComponent;
  let fixture: ComponentFixture<RuntimeCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuntimeCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuntimeCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
