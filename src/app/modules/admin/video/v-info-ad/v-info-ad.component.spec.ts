import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VInfoAdComponent } from './v-info-ad.component';

describe('VInfoAdComponent', () => {
  let component: VInfoAdComponent;
  let fixture: ComponentFixture<VInfoAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VInfoAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VInfoAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
