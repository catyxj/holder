import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueListAdComponent } from './blue-list-ad.component';

describe('BlueListAdComponent', () => {
  let component: BlueListAdComponent;
  let fixture: ComponentFixture<BlueListAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueListAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueListAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
