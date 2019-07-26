import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueOperateAdComponent } from './blue-operate-ad.component';

describe('BlueOperateAdComponent', () => {
  let component: BlueOperateAdComponent;
  let fixture: ComponentFixture<BlueOperateAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueOperateAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueOperateAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
