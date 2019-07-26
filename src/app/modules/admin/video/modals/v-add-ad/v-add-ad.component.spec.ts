import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VAddAdComponent } from './v-add-ad.component';

describe('VAddAdComponent', () => {
  let component: VAddAdComponent;
  let fixture: ComponentFixture<VAddAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VAddAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VAddAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
