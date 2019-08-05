import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCommunicationEditFormalComponent } from './terminal-communication-edit-formal.component';

describe('TerminalCommunicationEditFormalComponent', () => {
  let component: TerminalCommunicationEditFormalComponent;
  let fixture: ComponentFixture<TerminalCommunicationEditFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalCommunicationEditFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalCommunicationEditFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
