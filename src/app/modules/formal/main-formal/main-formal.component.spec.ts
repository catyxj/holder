import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFormalComponent } from './main-formal.component';

describe('MainFormalComponent', () => {
  let component: MainFormalComponent;
  let fixture: ComponentFixture<MainFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
