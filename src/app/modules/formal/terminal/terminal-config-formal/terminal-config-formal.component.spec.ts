import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalConfigFormalComponent } from './terminal-config-formal.component';

describe('TerminalConfigFormalComponent', () => {
  let component: TerminalConfigFormalComponent;
  let fixture: ComponentFixture<TerminalConfigFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalConfigFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalConfigFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
