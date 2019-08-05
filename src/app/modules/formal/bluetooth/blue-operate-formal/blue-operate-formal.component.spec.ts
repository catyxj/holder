import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueOperateFormalComponent } from './blue-operate-formal.component';

describe('BlueOperateFormalComponent', () => {
  let component: BlueOperateFormalComponent;
  let fixture: ComponentFixture<BlueOperateFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueOperateFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueOperateFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
