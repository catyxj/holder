import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalInfoFormalComponent } from './terminal-info-formal.component';

describe('TerminalInfoFormalComponent', () => {
  let component: TerminalInfoFormalComponent;
  let fixture: ComponentFixture<TerminalInfoFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalInfoFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalInfoFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
