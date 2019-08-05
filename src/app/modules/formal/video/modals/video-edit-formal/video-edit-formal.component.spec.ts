import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoEditFormalComponent } from './video-edit-formal.component';

describe('VideoEditFormalComponent', () => {
  let component: VideoEditFormalComponent;
  let fixture: ComponentFixture<VideoEditFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoEditFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoEditFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
