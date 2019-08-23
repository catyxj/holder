import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAcBatchAddComponent } from './m-ac-batch-add.component';

describe('MAcBatchAddComponent', () => {
  let component: MAcBatchAddComponent;
  let fixture: ComponentFixture<MAcBatchAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAcBatchAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAcBatchAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
