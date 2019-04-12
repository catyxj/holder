import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainViewComponent } from './maintain-view.component';

describe('MaintainViewComponent', () => {
  let component: MaintainViewComponent;
  let fixture: ComponentFixture<MaintainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
