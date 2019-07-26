import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqListListComponent } from './eq-list-list.component';

describe('EqListListComponent', () => {
  let component: EqListListComponent;
  let fixture: ComponentFixture<EqListListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqListListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
