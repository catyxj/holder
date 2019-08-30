import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeOfflineComponent } from './notice-offline.component';

describe('NoticeOfflineComponent', () => {
  let component: NoticeOfflineComponent;
  let fixture: ComponentFixture<NoticeOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
