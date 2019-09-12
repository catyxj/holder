import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CluAddComponent } from './clu-add.component';

describe('CluAddComponent', () => {
  let component: CluAddComponent;
  let fixture: ComponentFixture<CluAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CluAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CluAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
