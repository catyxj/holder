import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvMainAdComponent } from './ov-main-ad.component';

describe('OvMainAdComponent', () => {
  let component: OvMainAdComponent;
  let fixture: ComponentFixture<OvMainAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvMainAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvMainAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
