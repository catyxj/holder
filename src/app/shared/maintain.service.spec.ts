import { TestBed, inject } from '@angular/core/testing';

import { MaintainService } from './maintain.service';

describe('MaintainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaintainService]
    });
  });

  it('should be created', inject([MaintainService], (service: MaintainService) => {
    expect(service).toBeTruthy();
  }));
});
