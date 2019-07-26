import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcInfoOrdComponent } from './ac-info-ord.component';

describe('AcInfoOrdComponent', () => {
  let component: AcInfoOrdComponent;
  let fixture: ComponentFixture<AcInfoOrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcInfoOrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcInfoOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
