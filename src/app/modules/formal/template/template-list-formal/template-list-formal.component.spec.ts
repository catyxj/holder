import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateListFormalComponent } from './template-list-formal.component';

describe('TemplateListFormalComponent', () => {
  let component: TemplateListFormalComponent;
  let fixture: ComponentFixture<TemplateListFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateListFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateListFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
