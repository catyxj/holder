import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailFormalComponent } from './user-detail-formal.component';

describe('UserDetailFormalComponent', () => {
  let component: UserDetailFormalComponent;
  let fixture: ComponentFixture<UserDetailFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
