import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CluAddCluComponent } from './clu-add-clu.component';

describe('CluAddCluComponent', () => {
  let component: CluAddCluComponent;
  let fixture: ComponentFixture<CluAddCluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CluAddCluComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CluAddCluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
