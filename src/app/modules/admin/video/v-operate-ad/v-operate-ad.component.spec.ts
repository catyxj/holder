import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VOperateAdComponent } from './v-operate-ad.component';

describe('VOperateAdComponent', () => {
  let component: VOperateAdComponent;
  let fixture: ComponentFixture<VOperateAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VOperateAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VOperateAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
