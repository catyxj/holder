import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListFormalComponent } from './user-list-formal.component';

describe('UserListFormalComponent', () => {
  let component: UserListFormalComponent;
  let fixture: ComponentFixture<UserListFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
