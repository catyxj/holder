import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAddEptComponent } from './template-add-ept.component';

describe('TemplateAddEptComponent', () => {
  let component: TemplateAddEptComponent;
  let fixture: ComponentFixture<TemplateAddEptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAddEptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAddEptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
