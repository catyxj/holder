import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoInfoFormalComponent } from './video-info-formal.component';

describe('VideoInfoFormalComponent', () => {
  let component: VideoInfoFormalComponent;
  let fixture: ComponentFixture<VideoInfoFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoInfoFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoInfoFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
