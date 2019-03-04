import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceAddComponent } from './face-add.component';

describe('FaceAddComponent', () => {
  let component: FaceAddComponent;
  let fixture: ComponentFixture<FaceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
