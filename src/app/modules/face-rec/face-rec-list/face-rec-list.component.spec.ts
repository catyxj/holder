import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceRecListComponent } from './face-rec-list.component';

describe('FaceRecListComponent', () => {
  let component: FaceRecListComponent;
  let fixture: ComponentFixture<FaceRecListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceRecListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceRecListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
