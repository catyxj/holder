import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerMessageAdComponent } from './ter-message-ad.component';

describe('TerMessageAdComponent', () => {
  let component: TerMessageAdComponent;
  let fixture: ComponentFixture<TerMessageAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerMessageAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerMessageAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
