import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueListFormalComponent } from './blue-list-formal.component';

describe('BlueListFormalComponent', () => {
  let component: BlueListFormalComponent;
  let fixture: ComponentFixture<BlueListFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueListFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueListFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
