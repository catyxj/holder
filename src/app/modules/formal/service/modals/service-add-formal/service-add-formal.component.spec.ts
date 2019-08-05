import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAddFormalComponent } from './service-add-formal.component';

describe('ServiceAddFormalComponent', () => {
  let component: ServiceAddFormalComponent;
  let fixture: ComponentFixture<ServiceAddFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAddFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAddFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
