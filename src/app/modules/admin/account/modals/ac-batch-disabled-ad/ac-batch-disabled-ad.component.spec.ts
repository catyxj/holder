import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcBatchDisabledAdComponent } from './ac-batch-disabled-ad.component';

describe('AcBatchDisabledAdComponent', () => {
  let component: AcBatchDisabledAdComponent;
  let fixture: ComponentFixture<AcBatchDisabledAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcBatchDisabledAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcBatchDisabledAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
