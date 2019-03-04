import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueListComponent } from './blue-list.component';

describe('BlueListComponent', () => {
  let component: BlueListComponent;
  let fixture: ComponentFixture<BlueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
