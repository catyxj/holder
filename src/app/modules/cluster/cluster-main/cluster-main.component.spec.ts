import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterMainComponent } from './cluster-main.component';

describe('ClusterMainComponent', () => {
  let component: ClusterMainComponent;
  let fixture: ComponentFixture<ClusterMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
