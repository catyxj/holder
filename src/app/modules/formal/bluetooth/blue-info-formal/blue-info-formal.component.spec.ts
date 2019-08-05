import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueInfoFormalComponent } from './blue-info-formal.component';

describe('BlueInfoFormalComponent', () => {
  let component: BlueInfoFormalComponent;
  let fixture: ComponentFixture<BlueInfoFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueInfoFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueInfoFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
