import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueScrapAdComponent } from './blue-scrap-ad.component';

describe('BlueScrapAdComponent', () => {
  let component: BlueScrapAdComponent;
  let fixture: ComponentFixture<BlueScrapAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueScrapAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueScrapAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
