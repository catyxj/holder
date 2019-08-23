import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipInfoOrComponent } from './equip-info-or.component';

describe('EquipInfoOrComponent', () => {
  let component: EquipInfoOrComponent;
  let fixture: ComponentFixture<EquipInfoOrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipInfoOrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipInfoOrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
