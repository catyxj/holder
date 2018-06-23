import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalMainComponent } from './terminal-main.component';

describe('TerminalMainComponent', () => {
  let component: TerminalMainComponent;
  let fixture: ComponentFixture<TerminalMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
