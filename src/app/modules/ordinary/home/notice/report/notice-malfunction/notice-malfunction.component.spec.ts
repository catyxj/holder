import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeMalfunctionComponent } from './notice-malfunction.component';

describe('NoticeMalfunctionComponent', () => {
  let component: NoticeMalfunctionComponent;
  let fixture: ComponentFixture<NoticeMalfunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeMalfunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeMalfunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
