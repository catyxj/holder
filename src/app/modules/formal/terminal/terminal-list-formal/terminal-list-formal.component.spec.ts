import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalListFormalComponent } from './terminal-list-formal.component';

describe('TerminalListFormalComponent', () => {
  let component: TerminalListFormalComponent;
  let fixture: ComponentFixture<TerminalListFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalListFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalListFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
