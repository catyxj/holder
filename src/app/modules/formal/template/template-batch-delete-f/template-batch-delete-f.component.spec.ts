import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateBatchDeleteFComponent } from './template-batch-delete-f.component';

describe('TemplateBatchDeleteFComponent', () => {
  let component: TemplateBatchDeleteFComponent;
  let fixture: ComponentFixture<TemplateBatchDeleteFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateBatchDeleteFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateBatchDeleteFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
