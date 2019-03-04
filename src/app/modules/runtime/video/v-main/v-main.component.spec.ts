import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VMainComponent } from './v-main.component';

describe('VMainComponent', () => {
  let component: VMainComponent;
  let fixture: ComponentFixture<VMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
