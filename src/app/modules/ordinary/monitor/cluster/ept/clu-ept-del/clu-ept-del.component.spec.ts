import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CluEptDelComponent } from './clu-ept-del.component';

describe('CluEptDelComponent', () => {
  let component: CluEptDelComponent;
  let fixture: ComponentFixture<CluEptDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CluEptDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CluEptDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
