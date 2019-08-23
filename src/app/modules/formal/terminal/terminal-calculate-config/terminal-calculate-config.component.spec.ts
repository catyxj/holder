import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCalculateConfigComponent } from './terminal-calculate-config.component';

describe('TerminalCalculateConfigComponent', () => {
  let component: TerminalCalculateConfigComponent;
  let fixture: ComponentFixture<TerminalCalculateConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalCalculateConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalCalculateConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
