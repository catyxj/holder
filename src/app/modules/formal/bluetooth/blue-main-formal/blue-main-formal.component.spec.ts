import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueMainFormalComponent } from './blue-main-formal.component';

describe('BlueMainFormalComponent', () => {
  let component: BlueMainFormalComponent;
  let fixture: ComponentFixture<BlueMainFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueMainFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueMainFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
