import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CluEptAddComponent } from './clu-ept-add.component';

describe('CluEptAddComponent', () => {
  let component: CluEptAddComponent;
  let fixture: ComponentFixture<CluEptAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CluEptAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CluEptAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
