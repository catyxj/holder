import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CluInfoComponent } from './clu-info.component';

describe('CluInfoComponent', () => {
  let component: CluInfoComponent;
  let fixture: ComponentFixture<CluInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CluInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CluInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
