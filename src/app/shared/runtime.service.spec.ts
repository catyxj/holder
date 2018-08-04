import { TestBed, inject } from '@angular/core/testing';

import { RuntimeService } from './runtime.service';

describe('RuntimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RuntimeService]
    });
  });

  it('should be created', inject([RuntimeService], (service: RuntimeService) => {
    expect(service).toBeTruthy();
  }));
});
