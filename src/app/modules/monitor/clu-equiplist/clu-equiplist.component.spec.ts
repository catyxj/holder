import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CluEquiplistComponent } from './clu-equiplist.component';

describe('CluEquiplistComponent', () => {
  let component: CluEquiplistComponent;
  let fixture: ComponentFixture<CluEquiplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CluEquiplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CluEquiplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
