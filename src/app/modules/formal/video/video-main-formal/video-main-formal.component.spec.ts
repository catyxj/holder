import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMainFormalComponent } from './video-main-formal.component';

describe('VideoMainFormalComponent', () => {
  let component: VideoMainFormalComponent;
  let fixture: ComponentFixture<VideoMainFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoMainFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoMainFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
