import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuntimeMViewComponent } from './runtime-m-view.component';

describe('RuntimeMViewComponent', () => {
  let component: RuntimeMViewComponent;
  let fixture: ComponentFixture<RuntimeMViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuntimeMViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuntimeMViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
