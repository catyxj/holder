import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoOrderServiceDirComponent } from './logo-order-service-dir.component';

describe('LogoOrderServiceDirComponent', () => {
  let component: LogoOrderServiceDirComponent;
  let fixture: ComponentFixture<LogoOrderServiceDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoOrderServiceDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoOrderServiceDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
