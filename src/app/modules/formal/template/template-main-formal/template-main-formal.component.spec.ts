import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateMainFormalComponent } from './template-main-formal.component';

describe('TemplateMainFormalComponent', () => {
  let component: TemplateMainFormalComponent;
  let fixture: ComponentFixture<TemplateMainFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateMainFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateMainFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
