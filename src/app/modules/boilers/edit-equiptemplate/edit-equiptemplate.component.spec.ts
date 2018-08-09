import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEquiptemplateComponent } from './edit-equiptemplate.component';

describe('EditEquiptemplateComponent', () => {
  let component: EditEquiptemplateComponent;
  let fixture: ComponentFixture<EditEquiptemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEquiptemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEquiptemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
