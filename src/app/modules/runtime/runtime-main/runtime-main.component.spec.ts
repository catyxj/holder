import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuntimeMainComponent } from './runtime-main.component';

describe('RuntimeMainComponent', () => {
  let component: RuntimeMainComponent;
  let fixture: ComponentFixture<RuntimeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuntimeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuntimeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
