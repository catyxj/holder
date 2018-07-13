import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerConfigComponent } from './ter-config.component';

describe('TerConfigComponent', () => {
  let component: TerConfigComponent;
  let fixture: ComponentFixture<TerConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
