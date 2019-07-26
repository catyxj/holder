import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcDisableAdComponent } from './ac-disable-ad.component';

describe('AcDisableAdComponent', () => {
  let component: AcDisableAdComponent;
  let fixture: ComponentFixture<AcDisableAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcDisableAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcDisableAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
