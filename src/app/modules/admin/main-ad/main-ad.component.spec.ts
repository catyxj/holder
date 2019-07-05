import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdComponent } from './main-ad.component';

describe('MainAdComponent', () => {
  let component: MainAdComponent;
  let fixture: ComponentFixture<MainAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
