import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcOperateAdComponent } from './ac-operate-ad.component';

describe('AcOperateAdComponent', () => {
  let component: AcOperateAdComponent;
  let fixture: ComponentFixture<AcOperateAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcOperateAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcOperateAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
