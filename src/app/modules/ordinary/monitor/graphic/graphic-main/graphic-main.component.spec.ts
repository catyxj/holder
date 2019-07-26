import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicMainComponent } from './graphic-main.component';

describe('GraphicMainComponent', () => {
  let component: GraphicMainComponent;
  let fixture: ComponentFixture<GraphicMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
