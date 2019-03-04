import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueEditComponent } from './blue-edit.component';

describe('BlueEditComponent', () => {
  let component: BlueEditComponent;
  let fixture: ComponentFixture<BlueEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
