import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAccountAddFComponent } from './m-account-add-f.component';

describe('MAccountAddFComponent', () => {
  let component: MAccountAddFComponent;
  let fixture: ComponentFixture<MAccountAddFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAccountAddFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAccountAddFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
