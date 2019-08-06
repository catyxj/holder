import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAddFinishComponent } from './template-add-finish.component';

describe('TemplateAddFinishComponent', () => {
  let component: TemplateAddFinishComponent;
  let fixture: ComponentFixture<TemplateAddFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAddFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAddFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
