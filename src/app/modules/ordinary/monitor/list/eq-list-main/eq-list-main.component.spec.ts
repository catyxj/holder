import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqListMainComponent } from './eq-list-main.component';

describe('EqListMainComponent', () => {
  let component: EqListMainComponent;
  let fixture: ComponentFixture<EqListMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqListMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqListMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
