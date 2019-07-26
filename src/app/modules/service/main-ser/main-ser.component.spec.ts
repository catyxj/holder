import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSerComponent } from './main-ser.component';

describe('MainSerComponent', () => {
  let component: MainSerComponent;
  let fixture: ComponentFixture<MainSerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
