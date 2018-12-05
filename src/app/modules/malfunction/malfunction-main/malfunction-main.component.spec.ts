import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalfunctionMainComponent } from './malfunction-main.component';

describe('MalfunctionMainComponent', () => {
  let component: MalfunctionMainComponent;
  let fixture: ComponentFixture<MalfunctionMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalfunctionMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MalfunctionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
