import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTemplateListFormalComponent } from './m-template-list-formal.component';

describe('MTemplateListFormalComponent', () => {
  let component: MTemplateListFormalComponent;
  let fixture: ComponentFixture<MTemplateListFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTemplateListFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTemplateListFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
