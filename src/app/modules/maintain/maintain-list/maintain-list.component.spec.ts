import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainListComponent } from './maintain-list.component';

describe('MaintainListComponent', () => {
  let component: MaintainListComponent;
  let fixture: ComponentFixture<MaintainListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
