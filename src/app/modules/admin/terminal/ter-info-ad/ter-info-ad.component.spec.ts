import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerInfoAdComponent } from './ter-info-ad.component';

describe('TerInfoAdComponent', () => {
  let component: TerInfoAdComponent;
  let fixture: ComponentFixture<TerInfoAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerInfoAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerInfoAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
