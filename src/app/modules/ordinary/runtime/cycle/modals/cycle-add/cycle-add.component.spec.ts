import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleAddComponent } from './cycle-add.component';

describe('CycleAddComponent', () => {
  let component: CycleAddComponent;
  let fixture: ComponentFixture<CycleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
