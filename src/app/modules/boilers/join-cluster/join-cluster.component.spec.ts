import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinClusterComponent } from './join-cluster.component';

describe('JoinClusterComponent', () => {
  let component: JoinClusterComponent;
  let fixture: ComponentFixture<JoinClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
