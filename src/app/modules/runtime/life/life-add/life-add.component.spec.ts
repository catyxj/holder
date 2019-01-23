import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeAddComponent } from './life-add.component';

describe('LifeAddComponent', () => {
  let component: LifeAddComponent;
  let fixture: ComponentFixture<LifeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
