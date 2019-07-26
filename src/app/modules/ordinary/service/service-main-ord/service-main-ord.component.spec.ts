import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMainOrdComponent } from './service-main-ord.component';

describe('ServiceMainOrdComponent', () => {
  let component: ServiceMainOrdComponent;
  let fixture: ComponentFixture<ServiceMainOrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceMainOrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMainOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
