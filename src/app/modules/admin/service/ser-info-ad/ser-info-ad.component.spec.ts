import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerInfoAdComponent } from './ser-info-ad.component';

describe('SerInfoAdComponent', () => {
  let component: SerInfoAdComponent;
  let fixture: ComponentFixture<SerInfoAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerInfoAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerInfoAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
