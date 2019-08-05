import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalChannelConfigFormalComponent } from './terminal-channel-config-formal.component';

describe('TerminalChannelConfigFormalComponent', () => {
  let component: TerminalChannelConfigFormalComponent;
  let fixture: ComponentFixture<TerminalChannelConfigFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalChannelConfigFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalChannelConfigFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
