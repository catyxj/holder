import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateConfigFormalComponent } from './template-config-formal.component';

describe('TemplateConfigFormalComponent', () => {
  let component: TemplateConfigFormalComponent;
  let fixture: ComponentFixture<TemplateConfigFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateConfigFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateConfigFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
