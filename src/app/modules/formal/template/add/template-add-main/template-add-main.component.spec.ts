import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAddMainComponent } from './template-add-main.component';

describe('TemplateAddMainComponent', () => {
  let component: TemplateAddMainComponent;
  let fixture: ComponentFixture<TemplateAddMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAddMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAddMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
