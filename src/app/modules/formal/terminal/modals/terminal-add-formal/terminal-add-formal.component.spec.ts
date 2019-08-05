import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalAddFormalComponent } from './terminal-add-formal.component';

describe('TerminalAddFormalComponent', () => {
  let component: TerminalAddFormalComponent;
  let fixture: ComponentFixture<TerminalAddFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalAddFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalAddFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
