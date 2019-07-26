import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CluMainComponent } from './clu-main.component';

describe('CluMainComponent', () => {
  let component: CluMainComponent;
  let fixture: ComponentFixture<CluMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CluMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CluMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
