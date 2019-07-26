import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoLiveAdComponent } from './video-live-ad.component';

describe('VideoLiveAdComponent', () => {
  let component: VideoLiveAdComponent;
  let fixture: ComponentFixture<VideoLiveAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoLiveAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoLiveAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
