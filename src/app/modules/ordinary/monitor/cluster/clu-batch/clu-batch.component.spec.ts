import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CluBatchComponent } from './clu-batch.component';

describe('CluBatchComponent', () => {
  let component: CluBatchComponent;
  let fixture: ComponentFixture<CluBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CluBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CluBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
