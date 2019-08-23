import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuntimeMaintainComponent } from './runtime-maintain.component';

describe('RuntimeMaintainComponent', () => {
  let component: RuntimeMaintainComponent;
  let fixture: ComponentFixture<RuntimeMaintainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuntimeMaintainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuntimeMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
