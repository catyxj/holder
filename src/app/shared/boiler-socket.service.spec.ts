import { TestBed, inject } from '@angular/core/testing';

import { BoilerSocketService } from './boiler-socket.service';

describe('BoilerSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoilerSocketService]
    });
  });

  it('should be created', inject([BoilerSocketService], (service: BoilerSocketService) => {
    expect(service).toBeTruthy();
  }));
});
