import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAddOrComponent } from './service-add-or.component';

describe('ServiceAddOrComponent', () => {
  let component: ServiceAddOrComponent;
  let fixture: ComponentFixture<ServiceAddOrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAddOrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAddOrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
