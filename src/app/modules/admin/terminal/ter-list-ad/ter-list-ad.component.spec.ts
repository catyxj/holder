import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerListAdComponent } from './ter-list-ad.component';

describe('TerListAdComponent', () => {
  let component: TerListAdComponent;
  let fixture: ComponentFixture<TerListAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerListAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerListAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
