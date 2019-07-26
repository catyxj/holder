import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMainFormalComponent } from './service-main-formal.component';

describe('ServiceMainFormalComponent', () => {
  let component: ServiceMainFormalComponent;
  let fixture: ComponentFixture<ServiceMainFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceMainFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMainFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
