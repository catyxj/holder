import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageOrderServiceDirComponent } from './storage-order-service-dir.component';

describe('StorageOrderServiceDirComponent', () => {
  let component: StorageOrderServiceDirComponent;
  let fixture: ComponentFixture<StorageOrderServiceDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageOrderServiceDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageOrderServiceDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
