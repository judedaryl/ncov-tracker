import { TestBed } from '@angular/core/testing';

import { ConfirmedApiService } from './confirmed-api.service';

describe('ConfirmedApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmedApiService = TestBed.get(ConfirmedApiService);
    expect(service).toBeTruthy();
  });
});
