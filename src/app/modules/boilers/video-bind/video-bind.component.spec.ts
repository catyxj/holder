import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoBindComponent } from './video-bind.component';

describe('VideoBindComponent', () => {
  let component: VideoBindComponent;
  let fixture: ComponentFixture<VideoBindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoBindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoBindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
