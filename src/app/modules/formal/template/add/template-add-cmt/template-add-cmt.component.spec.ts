import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAddCmtComponent } from './template-add-cmt.component';

describe('TemplateAddCmtComponent', () => {
  let component: TemplateAddCmtComponent;
  let fixture: ComponentFixture<TemplateAddCmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAddCmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAddCmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
