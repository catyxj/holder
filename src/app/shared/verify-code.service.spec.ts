import { TestBed, inject } from '@angular/core/testing';

import { VerifyCodeService } from './verify-code.service';

describe('VerifyCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifyCodeService]
    });
  });

  it('should be created', inject([VerifyCodeService], (service: VerifyCodeService) => {
    expect(service).toBeTruthy();
  }));
});
