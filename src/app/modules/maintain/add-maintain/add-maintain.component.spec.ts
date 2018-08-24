import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaintainComponent } from './add-maintain.component';

describe('AddMaintainComponent', () => {
  let component: AddMaintainComponent;
  let fixture: ComponentFixture<AddMaintainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMaintainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
