import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcOperateOrdComponent } from './ac-operate-ord.component';

describe('AcOperateOrdComponent', () => {
  let component: AcOperateOrdComponent;
  let fixture: ComponentFixture<AcOperateOrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcOperateOrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcOperateOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
