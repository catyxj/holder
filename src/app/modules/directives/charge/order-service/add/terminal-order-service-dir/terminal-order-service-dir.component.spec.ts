import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalOrderServiceDirComponent } from './terminal-order-service-dir.component';

describe('TerminalOrderServiceDirComponent', () => {
  let component: TerminalOrderServiceDirComponent;
  let fixture: ComponentFixture<TerminalOrderServiceDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalOrderServiceDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalOrderServiceDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
