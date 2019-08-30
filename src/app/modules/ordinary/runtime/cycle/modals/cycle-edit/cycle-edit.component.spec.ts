import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleEditComponent } from './cycle-edit.component';

describe('CycleEditComponent', () => {
  let component: CycleEditComponent;
  let fixture: ComponentFixture<CycleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
