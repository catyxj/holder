import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOrdComponent } from './main-ord.component';

describe('MainOrdComponent', () => {
  let component: MainOrdComponent;
  let fixture: ComponentFixture<MainOrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainOrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
