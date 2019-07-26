import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainProdListSerComponent } from './maintain-prod-list-ser.component';

describe('MaintainProdListSerComponent', () => {
  let component: MaintainProdListSerComponent;
  let fixture: ComponentFixture<MaintainProdListSerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainProdListSerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainProdListSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
