import { TestBed } from '@angular/core/testing';

import { AgeGroupApiService } from './age-group-api.service';

describe('AgeGroupApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgeGroupApiService = TestBed.get(AgeGroupApiService);
    expect(service).toBeTruthy();
  });
});
