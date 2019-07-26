import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInfoFormalComponent } from './service-info-formal.component';

describe('ServiceInfoFormalComponent', () => {
  let component: ServiceInfoFormalComponent;
  let fixture: ComponentFixture<ServiceInfoFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceInfoFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceInfoFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
