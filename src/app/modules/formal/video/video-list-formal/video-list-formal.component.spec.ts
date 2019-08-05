import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListFormalComponent } from './video-list-formal.component';

describe('VideoListFormalComponent', () => {
  let component: VideoListFormalComponent;
  let fixture: ComponentFixture<VideoListFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoListFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoListFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
