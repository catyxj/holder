import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalBasicEditFormalComponent } from './terminal-basic-edit-formal.component';

describe('TerminalBasicEditFormalComponent', () => {
  let component: TerminalBasicEditFormalComponent;
  let fixture: ComponentFixture<TerminalBasicEditFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalBasicEditFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalBasicEditFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
