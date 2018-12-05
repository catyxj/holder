import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalDetailComponent } from './mal-detail.component';

describe('MalDetailComponent', () => {
  let component: MalDetailComponent;
  let fixture: ComponentFixture<MalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
