import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOperateFormalComponent } from './video-operate-formal.component';

describe('VideoOperateFormalComponent', () => {
  let component: VideoOperateFormalComponent;
  let fixture: ComponentFixture<VideoOperateFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoOperateFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoOperateFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
