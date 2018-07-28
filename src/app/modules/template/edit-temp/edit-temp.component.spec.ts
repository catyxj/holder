import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTempComponent } from './edit-temp.component';

describe('EditTempComponent', () => {
  let component: EditTempComponent;
  let fixture: ComponentFixture<EditTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
