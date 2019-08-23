import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTempBatchAllocateFComponent } from './m-temp-batch-allocate-f.component';

describe('MTempBatchAllocateFComponent', () => {
  let component: MTempBatchAllocateFComponent;
  let fixture: ComponentFixture<MTempBatchAllocateFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTempBatchAllocateFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTempBatchAllocateFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
