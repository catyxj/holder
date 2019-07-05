import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirMainComponent } from './dir-main.component';

describe('DirMainComponent', () => {
  let component: DirMainComponent;
  let fixture: ComponentFixture<DirMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
