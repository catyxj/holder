import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeEditComponent } from './life-edit.component';

describe('LifeEditComponent', () => {
  let component: LifeEditComponent;
  let fixture: ComponentFixture<LifeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
