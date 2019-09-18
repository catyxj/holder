import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUpgradeOrderServiceDirComponent } from './video-upgrade-order-service-dir.component';

describe('VideoUpgradeOrderServiceDirComponent', () => {
  let component: VideoUpgradeOrderServiceDirComponent;
  let fixture: ComponentFixture<VideoUpgradeOrderServiceDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUpgradeOrderServiceDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUpgradeOrderServiceDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
