import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalAddImgFormalComponent } from './terminal-add-img-formal.component';

describe('TerminalAddImgFormalComponent', () => {
  let component: TerminalAddImgFormalComponent;
  let fixture: ComponentFixture<TerminalAddImgFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalAddImgFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalAddImgFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
