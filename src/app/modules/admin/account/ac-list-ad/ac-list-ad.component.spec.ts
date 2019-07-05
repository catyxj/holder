import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcListAdComponent } from './ac-list-ad.component';

describe('AcListAdComponent', () => {
  let component: AcListAdComponent;
  let fixture: ComponentFixture<AcListAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcListAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcListAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
