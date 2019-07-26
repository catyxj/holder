import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListOrdComponent } from './service-list-ord.component';

describe('ServiceListOrdComponent', () => {
  let component: ServiceListOrdComponent;
  let fixture: ComponentFixture<ServiceListOrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceListOrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceListOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
