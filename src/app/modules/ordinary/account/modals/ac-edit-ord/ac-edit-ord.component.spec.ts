import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcEditOrdComponent } from './ac-edit-ord.component';

describe('AcEditOrdComponent', () => {
  let component: AcEditOrdComponent;
  let fixture: ComponentFixture<AcEditOrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcEditOrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcEditOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
