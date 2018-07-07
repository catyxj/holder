import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerBindComponent } from './ter-bind.component';

describe('TerBindComponent', () => {
  let component: TerBindComponent;
  let fixture: ComponentFixture<TerBindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerBindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerBindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
