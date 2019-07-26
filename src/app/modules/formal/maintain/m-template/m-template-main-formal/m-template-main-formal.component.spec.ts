import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTemplateMainFormalComponent } from './m-template-main-formal.component';

describe('MTemplateMainFormalComponent', () => {
  let component: MTemplateMainFormalComponent;
  let fixture: ComponentFixture<MTemplateMainFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTemplateMainFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTemplateMainFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
