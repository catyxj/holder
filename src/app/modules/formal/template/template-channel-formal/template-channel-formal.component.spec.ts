import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateChannelFormalComponent } from './template-channel-formal.component';

describe('TemplateChannelFormalComponent', () => {
  let component: TemplateChannelFormalComponent;
  let fixture: ComponentFixture<TemplateChannelFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateChannelFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateChannelFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
