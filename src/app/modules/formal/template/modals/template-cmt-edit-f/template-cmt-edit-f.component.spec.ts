import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCmtEditFComponent } from './template-cmt-edit-f.component';

describe('TemplateCmtEditFComponent', () => {
  let component: TemplateCmtEditFComponent;
  let fixture: ComponentFixture<TemplateCmtEditFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateCmtEditFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCmtEditFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
