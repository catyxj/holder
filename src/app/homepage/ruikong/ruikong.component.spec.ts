import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuikongComponent } from './ruikong.component';

describe('RuikongComponent', () => {
  let component: RuikongComponent;
  let fixture: ComponentFixture<RuikongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuikongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuikongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
