import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqListAddComponent } from './eq-list-add.component';

describe('EqListAddComponent', () => {
  let component: EqListAddComponent;
  let fixture: ComponentFixture<EqListAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqListAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
