import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAddCustomizeComponent } from './template-add-customize.component';

describe('TemplateAddCustomizeComponent', () => {
  let component: TemplateAddCustomizeComponent;
  let fixture: ComponentFixture<TemplateAddCustomizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAddCustomizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAddCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
