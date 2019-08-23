import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqBatchComponent } from './eq-batch.component';

describe('EqBatchComponent', () => {
  let component: EqBatchComponent;
  let fixture: ComponentFixture<EqBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
