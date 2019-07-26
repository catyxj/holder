import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcMainOrdComponent } from './ac-main-ord.component';

describe('AcMainOrdComponent', () => {
  let component: AcMainOrdComponent;
  let fixture: ComponentFixture<AcMainOrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcMainOrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcMainOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
