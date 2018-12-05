import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalHistoryComponent } from './mal-history.component';

describe('MalHistoryComponent', () => {
  let component: MalHistoryComponent;
  let fixture: ComponentFixture<MalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
