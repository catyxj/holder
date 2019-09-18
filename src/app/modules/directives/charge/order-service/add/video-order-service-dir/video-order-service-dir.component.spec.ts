import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOrderServiceDirComponent } from './video-order-service-dir.component';

describe('VideoOrderServiceDirComponent', () => {
  let component: VideoOrderServiceDirComponent;
  let fixture: ComponentFixture<VideoOrderServiceDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoOrderServiceDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoOrderServiceDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
