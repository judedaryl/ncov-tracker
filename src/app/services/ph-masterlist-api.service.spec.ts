import { TestBed } from '@angular/core/testing';

import { PhMasterlistApiService } from './ph-masterlist-api.service';

describe('PhMasterlistApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhMasterlistApiService = TestBed.get(PhMasterlistApiService);
    expect(service).toBeTruthy();
  });
});
