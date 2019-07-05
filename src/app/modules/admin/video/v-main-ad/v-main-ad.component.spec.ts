import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VMainAdComponent } from './v-main-ad.component';

describe('VMainAdComponent', () => {
  let component: VMainAdComponent;
  let fixture: ComponentFixture<VMainAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VMainAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VMainAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
