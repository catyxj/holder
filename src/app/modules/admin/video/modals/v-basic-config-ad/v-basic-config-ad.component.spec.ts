import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VBasicConfigAdComponent } from './v-basic-config-ad.component';

describe('VBasicConfigAdComponent', () => {
  let component: VBasicConfigAdComponent;
  let fixture: ComponentFixture<VBasicConfigAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VBasicConfigAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VBasicConfigAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
