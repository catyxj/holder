import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcBatchActiveAdComponent } from './ac-batch-active-ad.component';

describe('AcBatchActiveAdComponent', () => {
  let component: AcBatchActiveAdComponent;
  let fixture: ComponentFixture<AcBatchActiveAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcBatchActiveAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcBatchActiveAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
