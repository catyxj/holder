import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAcBatchDeleteComponent } from './m-ac-batch-delete.component';

describe('MAcBatchDeleteComponent', () => {
  let component: MAcBatchDeleteComponent;
  let fixture: ComponentFixture<MAcBatchDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAcBatchDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAcBatchDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
