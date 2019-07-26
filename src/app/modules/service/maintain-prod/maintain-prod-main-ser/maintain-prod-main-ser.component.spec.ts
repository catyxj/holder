import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainProdMainSerComponent } from './maintain-prod-main-ser.component';

describe('MaintainProdMainSerComponent', () => {
  let component: MaintainProdMainSerComponent;
  let fixture: ComponentFixture<MaintainProdMainSerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainProdMainSerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainProdMainSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
