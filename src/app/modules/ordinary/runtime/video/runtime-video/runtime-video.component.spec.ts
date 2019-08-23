import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuntimeVideoComponent } from './runtime-video.component';

describe('RuntimeVideoComponent', () => {
  let component: RuntimeVideoComponent;
  let fixture: ComponentFixture<RuntimeVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuntimeVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuntimeVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
