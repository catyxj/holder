import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVipComponent } from './home-vip.component';

describe('HomeVipComponent', () => {
  let component: HomeVipComponent;
  let fixture: ComponentFixture<HomeVipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeVipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
