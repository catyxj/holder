import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerAddComponent } from './ser-add.component';

describe('SerAddComponent', () => {
  let component: SerAddComponent;
  let fixture: ComponentFixture<SerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
