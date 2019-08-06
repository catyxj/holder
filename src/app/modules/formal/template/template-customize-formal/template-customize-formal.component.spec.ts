import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCustomizeFormalComponent } from './template-customize-formal.component';

describe('TemplateCustomizeFormalComponent', () => {
  let component: TemplateCustomizeFormalComponent;
  let fixture: ComponentFixture<TemplateCustomizeFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateCustomizeFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCustomizeFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
