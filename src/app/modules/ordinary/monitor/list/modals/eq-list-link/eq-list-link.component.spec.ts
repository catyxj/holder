import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqListLinkComponent } from './eq-list-link.component';

describe('EqListLinkComponent', () => {
  let component: EqListLinkComponent;
  let fixture: ComponentFixture<EqListLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqListLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqListLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
