import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoilerComponent } from './edit-boiler.component';

describe('EditBoilerComponent', () => {
  let component: EditBoilerComponent;
  let fixture: ComponentFixture<EditBoilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBoilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBoilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
