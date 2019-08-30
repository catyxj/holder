import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqHistoryComponent } from './eq-history.component';

describe('EqHistoryComponent', () => {
  let component: EqHistoryComponent;
  let fixture: ComponentFixture<EqHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
