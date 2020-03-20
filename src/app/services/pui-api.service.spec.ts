import { TestBed } from '@angular/core/testing';

import { PuiApiService } from './pui-api.service';

describe('PuiApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuiApiService = TestBed.get(PuiApiService);
    expect(service).toBeTruthy();
  });
});
