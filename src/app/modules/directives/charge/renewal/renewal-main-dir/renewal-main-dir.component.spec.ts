import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalMainDirComponent } from './renewal-main-dir.component';

describe('RenewalMainDirComponent', () => {
  let component: RenewalMainDirComponent;
  let fixture: ComponentFixture<RenewalMainDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalMainDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalMainDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
