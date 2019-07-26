import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerAddAdComponent } from './ter-add-ad.component';

describe('TerAddAdComponent', () => {
  let component: TerAddAdComponent;
  let fixture: ComponentFixture<TerAddAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerAddAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerAddAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
