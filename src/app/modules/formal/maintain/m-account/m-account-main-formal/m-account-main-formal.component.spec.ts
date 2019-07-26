import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAccountMainFormalComponent } from './m-account-main-formal.component';

describe('MAccountMainFormalComponent', () => {
  let component: MAccountMainFormalComponent;
  let fixture: ComponentFixture<MAccountMainFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAccountMainFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAccountMainFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
