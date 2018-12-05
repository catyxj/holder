import { TestBed, inject } from '@angular/core/testing';

import { MalfunctionService } from './malfunction.service';

describe('MalfunctionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MalfunctionService]
    });
  });

  it('should be created', inject([MalfunctionService], (service: MalfunctionService) => {
    expect(service).toBeTruthy();
  }));
});
