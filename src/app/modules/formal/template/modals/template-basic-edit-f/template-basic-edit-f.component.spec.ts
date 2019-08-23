import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateBasicEditFComponent } from './template-basic-edit-f.component';

describe('TemplateBasicEditFComponent', () => {
  let component: TemplateBasicEditFComponent;
  let fixture: ComponentFixture<TemplateBasicEditFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateBasicEditFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateBasicEditFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
