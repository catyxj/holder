import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerViewComponent } from './ser-view.component';

describe('SerViewComponent', () => {
  let component: SerViewComponent;
  let fixture: ComponentFixture<SerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
