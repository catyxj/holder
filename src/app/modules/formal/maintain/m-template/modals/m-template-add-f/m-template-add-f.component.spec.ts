import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTemplateAddFComponent } from './m-template-add-f.component';

describe('MTemplateAddFComponent', () => {
  let component: MTemplateAddFComponent;
  let fixture: ComponentFixture<MTemplateAddFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTemplateAddFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTemplateAddFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
