import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CluBasicEditComponent } from './clu-basic-edit.component';

describe('CluBasicEditComponent', () => {
  let component: CluBasicEditComponent;
  let fixture: ComponentFixture<CluBasicEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CluBasicEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CluBasicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
