import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerBatchAddAdComponent } from './ter-batch-add-ad.component';

describe('TerBatchAddAdComponent', () => {
  let component: TerBatchAddAdComponent;
  let fixture: ComponentFixture<TerBatchAddAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerBatchAddAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerBatchAddAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
