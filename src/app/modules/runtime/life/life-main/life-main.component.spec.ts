import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeMainComponent } from './life-main.component';

describe('LifeMainComponent', () => {
  let component: LifeMainComponent;
  let fixture: ComponentFixture<LifeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
