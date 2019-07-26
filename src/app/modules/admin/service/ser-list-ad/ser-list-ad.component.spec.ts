import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerListAdComponent } from './ser-list-ad.component';

describe('SerListAdComponent', () => {
  let component: SerListAdComponent;
  let fixture: ComponentFixture<SerListAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerListAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerListAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
