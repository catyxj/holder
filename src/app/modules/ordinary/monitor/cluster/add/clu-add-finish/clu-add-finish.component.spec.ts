import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CluAddFinishComponent } from './clu-add-finish.component';

describe('CluAddFinishComponent', () => {
  let component: CluAddFinishComponent;
  let fixture: ComponentFixture<CluAddFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CluAddFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CluAddFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
