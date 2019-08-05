import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueEditFormalComponent } from './blue-edit-formal.component';

describe('BlueEditFormalComponent', () => {
  let component: BlueEditFormalComponent;
  let fixture: ComponentFixture<BlueEditFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueEditFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueEditFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
