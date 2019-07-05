import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerMainAdComponent } from './ter-main-ad.component';

describe('TerMainAdComponent', () => {
  let component: TerMainAdComponent;
  let fixture: ComponentFixture<TerMainAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerMainAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerMainAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
