import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalCurrentComponent } from './mal-current.component';

describe('MalCurrentComponent', () => {
  let component: MalCurrentComponent;
  let fixture: ComponentFixture<MalCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MalCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
