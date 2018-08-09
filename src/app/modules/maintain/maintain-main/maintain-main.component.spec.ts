import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainMainComponent } from './maintain-main.component';

describe('MaintainMainComponent', () => {
  let component: MaintainMainComponent;
  let fixture: ComponentFixture<MaintainMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
