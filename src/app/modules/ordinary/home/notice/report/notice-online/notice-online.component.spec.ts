import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeOnlineComponent } from './notice-online.component';

describe('NoticeOnlineComponent', () => {
  let component: NoticeOnlineComponent;
  let fixture: ComponentFixture<NoticeOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
