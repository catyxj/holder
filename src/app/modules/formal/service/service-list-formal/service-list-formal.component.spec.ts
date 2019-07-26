import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListFormalComponent } from './service-list-formal.component';

describe('ServiceListFormalComponent', () => {
  let component: ServiceListFormalComponent;
  let fixture: ComponentFixture<ServiceListFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceListFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceListFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
