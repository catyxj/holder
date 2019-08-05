import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalOperateFormalComponent } from './terminal-operate-formal.component';

describe('TerminalOperateFormalComponent', () => {
  let component: TerminalOperateFormalComponent;
  let fixture: ComponentFixture<TerminalOperateFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalOperateFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalOperateFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
