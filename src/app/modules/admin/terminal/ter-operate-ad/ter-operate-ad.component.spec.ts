import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerOperateAdComponent } from './ter-operate-ad.component';

describe('TerOperateAdComponent', () => {
  let component: TerOperateAdComponent;
  let fixture: ComponentFixture<TerOperateAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerOperateAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerOperateAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
