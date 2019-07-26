import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerScrapAdComponent } from './ter-scrap-ad.component';

describe('TerScrapAdComponent', () => {
  let component: TerScrapAdComponent;
  let fixture: ComponentFixture<TerScrapAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerScrapAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerScrapAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
