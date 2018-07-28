import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBatchComponent } from './map-batch.component';

describe('MapBatchComponent', () => {
  let component: MapBatchComponent;
  let fixture: ComponentFixture<MapBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
