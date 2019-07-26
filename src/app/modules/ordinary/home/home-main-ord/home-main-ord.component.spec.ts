import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMainOrdComponent } from './home-main-ord.component';

describe('HomeMainOrdComponent', () => {
  let component: HomeMainOrdComponent;
  let fixture: ComponentFixture<HomeMainOrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMainOrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMainOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
