import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAddCalculateComponent } from './template-add-calculate.component';

describe('TemplateAddCalculateComponent', () => {
  let component: TemplateAddCalculateComponent;
  let fixture: ComponentFixture<TemplateAddCalculateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAddCalculateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAddCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
