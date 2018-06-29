import { TestBed, async, inject } from '@angular/core/testing';

import { UserloginGuard } from './userlogin.guard';

describe('UserloginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserloginGuard]
    });
  });

  it('should ...', inject([UserloginGuard], (guard: UserloginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
