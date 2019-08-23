import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTemplateEditFComponent } from './m-template-edit-f.component';

describe('MTemplateEditFComponent', () => {
  let component: MTemplateEditFComponent;
  let fixture: ComponentFixture<MTemplateEditFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTemplateEditFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTemplateEditFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
