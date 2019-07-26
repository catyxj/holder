import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcMainSerComponent } from './ac-main-ser.component';

describe('AcMainSerComponent', () => {
  let component: AcMainSerComponent;
  let fixture: ComponentFixture<AcMainSerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcMainSerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcMainSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
