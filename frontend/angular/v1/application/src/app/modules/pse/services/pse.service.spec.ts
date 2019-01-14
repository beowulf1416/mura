import { TestBed } from '@angular/core/testing';

import { PseService } from './pse.service';

describe('PseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PseService = TestBed.get(PseService);
    expect(service).toBeTruthy();
  });
});
