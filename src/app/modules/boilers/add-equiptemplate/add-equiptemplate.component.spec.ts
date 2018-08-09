import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEquiptemplateComponent } from './add-equiptemplate.component';

describe('AddEquiptemplateComponent', () => {
  let component: AddEquiptemplateComponent;
  let fixture: ComponentFixture<AddEquiptemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEquiptemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEquiptemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
