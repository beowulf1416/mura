import { TestBed } from '@angular/core/testing';

import { ForgotPwService } from './forgot-pw.service';

describe('ForgotPwService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForgotPwService = TestBed.get(ForgotPwService);
    expect(service).toBeTruthy();
  });
});
