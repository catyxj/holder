import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcMainAdComponent } from './ac-main-ad.component';

describe('AcMainAdComponent', () => {
  let component: AcMainAdComponent;
  let fixture: ComponentFixture<AcMainAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcMainAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcMainAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
