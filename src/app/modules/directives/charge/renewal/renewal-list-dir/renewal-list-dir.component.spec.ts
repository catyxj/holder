import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalListDirComponent } from './renewal-list-dir.component';

describe('RenewalListDirComponent', () => {
  let component: RenewalListDirComponent;
  let fixture: ComponentFixture<RenewalListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
