import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcInfoSerComponent } from './ac-info-ser.component';

describe('AcInfoSerComponent', () => {
  let component: AcInfoSerComponent;
  let fixture: ComponentFixture<AcInfoSerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcInfoSerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcInfoSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
