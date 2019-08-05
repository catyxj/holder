import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalMessageFormalComponent } from './terminal-message-formal.component';

describe('TerminalMessageFormalComponent', () => {
  let component: TerminalMessageFormalComponent;
  let fixture: ComponentFixture<TerminalMessageFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalMessageFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalMessageFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
