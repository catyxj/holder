import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateBatchAllocateComponent } from './template-batch-allocate.component';

describe('TemplateBatchAllocateComponent', () => {
  let component: TemplateBatchAllocateComponent;
  let fixture: ComponentFixture<TemplateBatchAllocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateBatchAllocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateBatchAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
