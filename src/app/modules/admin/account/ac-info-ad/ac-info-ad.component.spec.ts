import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcInfoAdComponent } from './ac-info-ad.component';

describe('AcInfoAdComponent', () => {
  let component: AcInfoAdComponent;
  let fixture: ComponentFixture<AcInfoAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcInfoAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcInfoAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
