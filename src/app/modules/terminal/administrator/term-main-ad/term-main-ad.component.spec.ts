import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermMainAdComponent } from './term-main-ad.component';

describe('TermMainAdComponent', () => {
  let component: TermMainAdComponent;
  let fixture: ComponentFixture<TermMainAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermMainAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermMainAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
