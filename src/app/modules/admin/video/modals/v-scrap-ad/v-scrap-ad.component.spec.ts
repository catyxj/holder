import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VScrapAdComponent } from './v-scrap-ad.component';

describe('VScrapAdComponent', () => {
  let component: VScrapAdComponent;
  let fixture: ComponentFixture<VScrapAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VScrapAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VScrapAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
