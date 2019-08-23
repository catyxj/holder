import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CluAddEptComponent } from './clu-add-ept.component';

describe('CluAddEptComponent', () => {
  let component: CluAddEptComponent;
  let fixture: ComponentFixture<CluAddEptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CluAddEptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CluAddEptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
