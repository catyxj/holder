import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAddFormalComponent } from './video-add-formal.component';

describe('VideoAddFormalComponent', () => {
  let component: VideoAddFormalComponent;
  let fixture: ComponentFixture<VideoAddFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoAddFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAddFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
