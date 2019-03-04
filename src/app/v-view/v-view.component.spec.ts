import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VViewComponent } from './v-view.component';

describe('VViewComponent', () => {
  let component: VViewComponent;
  let fixture: ComponentFixture<VViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
