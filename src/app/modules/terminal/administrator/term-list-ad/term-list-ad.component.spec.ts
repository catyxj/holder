import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermListAdComponent } from './term-list-ad.component';

describe('TermListAdComponent', () => {
  let component: TermListAdComponent;
  let fixture: ComponentFixture<TermListAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermListAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermListAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
