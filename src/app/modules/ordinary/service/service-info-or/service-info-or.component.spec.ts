import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInfoOrComponent } from './service-info-or.component';

describe('ServiceInfoOrComponent', () => {
  let component: ServiceInfoOrComponent;
  let fixture: ComponentFixture<ServiceInfoOrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceInfoOrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceInfoOrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
