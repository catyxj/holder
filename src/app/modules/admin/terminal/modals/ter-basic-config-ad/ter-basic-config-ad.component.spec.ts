import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerBasicConfigAdComponent } from './ter-basic-config-ad.component';

describe('TerBasicConfigAdComponent', () => {
  let component: TerBasicConfigAdComponent;
  let fixture: ComponentFixture<TerBasicConfigAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerBasicConfigAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerBasicConfigAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
