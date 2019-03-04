import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceMainComponent } from './face-main.component';

describe('FaceMainComponent', () => {
  let component: FaceMainComponent;
  let fixture: ComponentFixture<FaceMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
