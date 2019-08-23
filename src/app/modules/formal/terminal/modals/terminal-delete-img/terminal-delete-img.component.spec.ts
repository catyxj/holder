import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalDeleteImgComponent } from './terminal-delete-img.component';

describe('TerminalDeleteImgComponent', () => {
  let component: TerminalDeleteImgComponent;
  let fixture: ComponentFixture<TerminalDeleteImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalDeleteImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalDeleteImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
