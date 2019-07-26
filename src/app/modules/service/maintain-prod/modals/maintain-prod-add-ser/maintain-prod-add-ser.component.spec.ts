import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainProdAddSerComponent } from './maintain-prod-add-ser.component';

describe('MaintainProdAddSerComponent', () => {
  let component: MaintainProdAddSerComponent;
  let fixture: ComponentFixture<MaintainProdAddSerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainProdAddSerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainProdAddSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
