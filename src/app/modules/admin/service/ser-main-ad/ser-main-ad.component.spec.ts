import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerMainAdComponent } from './ser-main-ad.component';

describe('SerMainAdComponent', () => {
  let component: SerMainAdComponent;
  let fixture: ComponentFixture<SerMainAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerMainAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerMainAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
