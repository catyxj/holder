import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcPasswordOrdComponent } from './ac-password-ord.component';

describe('AcPasswordOrdComponent', () => {
  let component: AcPasswordOrdComponent;
  let fixture: ComponentFixture<AcPasswordOrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcPasswordOrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcPasswordOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
