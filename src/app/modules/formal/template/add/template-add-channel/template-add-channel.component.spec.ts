import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAddChannelComponent } from './template-add-channel.component';

describe('TemplateAddChannelComponent', () => {
  let component: TemplateAddChannelComponent;
  let fixture: ComponentFixture<TemplateAddChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAddChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAddChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
