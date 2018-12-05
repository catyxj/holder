import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainAddComponent } from './maintain-add.component';

describe('MaintainAddComponent', () => {
  let component: MaintainAddComponent;
  let fixture: ComponentFixture<MaintainAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
