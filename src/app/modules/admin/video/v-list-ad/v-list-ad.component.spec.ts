import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VListAdComponent } from './v-list-ad.component';

describe('VListAdComponent', () => {
  let component: VListAdComponent;
  let fixture: ComponentFixture<VListAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VListAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VListAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
