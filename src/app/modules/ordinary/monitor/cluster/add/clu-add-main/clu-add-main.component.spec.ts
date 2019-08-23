import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CluAddMainComponent } from './clu-add-main.component';

describe('CluAddMainComponent', () => {
  let component: CluAddMainComponent;
  let fixture: ComponentFixture<CluAddMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CluAddMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CluAddMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
