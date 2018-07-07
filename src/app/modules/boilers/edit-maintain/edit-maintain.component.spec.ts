import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaintainComponent } from './edit-maintain.component';

describe('EditMaintainComponent', () => {
  let component: EditMaintainComponent;
  let fixture: ComponentFixture<EditMaintainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMaintainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
