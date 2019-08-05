import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueAddFormalComponent } from './blue-add-formal.component';

describe('BlueAddFormalComponent', () => {
  let component: BlueAddFormalComponent;
  let fixture: ComponentFixture<BlueAddFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueAddFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueAddFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
