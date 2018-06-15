import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilersComponent } from './boilers.component';

describe('BoilersComponent', () => {
  let component: BoilersComponent;
  let fixture: ComponentFixture<BoilersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
