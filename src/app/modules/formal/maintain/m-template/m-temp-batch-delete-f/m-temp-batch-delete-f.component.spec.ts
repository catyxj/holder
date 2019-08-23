import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTempBatchDeleteFComponent } from './m-temp-batch-delete-f.component';

describe('MTempBatchDeleteFComponent', () => {
  let component: MTempBatchDeleteFComponent;
  let fixture: ComponentFixture<MTempBatchDeleteFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTempBatchDeleteFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTempBatchDeleteFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
