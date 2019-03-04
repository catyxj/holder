import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConfigComponent } from './video-config.component';

describe('VideoConfigComponent', () => {
  let component: VideoConfigComponent;
  let fixture: ComponentFixture<VideoConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
