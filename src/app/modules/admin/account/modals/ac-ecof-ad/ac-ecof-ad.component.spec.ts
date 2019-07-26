import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcEcofAdComponent } from './ac-ecof-ad.component';

describe('AcEcofAdComponent', () => {
  let component: AcEcofAdComponent;
  let fixture: ComponentFixture<AcEcofAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcEcofAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcEcofAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
