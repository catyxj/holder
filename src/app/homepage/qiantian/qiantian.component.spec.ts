import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QiantianComponent } from './qiantian.component';

describe('QiantianComponent', () => {
  let component: QiantianComponent;
  let fixture: ComponentFixture<QiantianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QiantianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QiantianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
