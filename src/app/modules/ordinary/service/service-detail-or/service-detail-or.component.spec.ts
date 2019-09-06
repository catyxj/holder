import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailOrComponent } from './service-detail-or.component';

describe('ServiceDetailOrComponent', () => {
  let component: ServiceDetailOrComponent;
  let fixture: ComponentFixture<ServiceDetailOrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDetailOrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailOrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
