import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCustomizeFormalComponent } from './terminal-customize-formal.component';

describe('TerminalCustomizeFormalComponent', () => {
  let component: TerminalCustomizeFormalComponent;
  let fixture: ComponentFixture<TerminalCustomizeFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalCustomizeFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalCustomizeFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
