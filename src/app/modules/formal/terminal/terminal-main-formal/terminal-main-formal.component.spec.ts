import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalMainFormalComponent } from './terminal-main-formal.component';

describe('TerminalMainFormalComponent', () => {
  let component: TerminalMainFormalComponent;
  let fixture: ComponentFixture<TerminalMainFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalMainFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalMainFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
