import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoilerComponent } from './add-boiler.component';

describe('AddBoilerComponent', () => {
  let component: AddBoilerComponent;
  let fixture: ComponentFixture<AddBoilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBoilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
