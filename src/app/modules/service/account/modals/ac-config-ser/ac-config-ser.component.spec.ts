import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcConfigSerComponent } from './ac-config-ser.component';

describe('AcConfigSerComponent', () => {
  let component: AcConfigSerComponent;
  let fixture: ComponentFixture<AcConfigSerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcConfigSerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcConfigSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
