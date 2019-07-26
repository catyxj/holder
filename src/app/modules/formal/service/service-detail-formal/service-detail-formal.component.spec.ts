import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailFormalComponent } from './service-detail-formal.component';

describe('ServiceDetailFormalComponent', () => {
  let component: ServiceDetailFormalComponent;
  let fixture: ComponentFixture<ServiceDetailFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDetailFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
