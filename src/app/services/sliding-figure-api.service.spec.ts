import { TestBed } from '@angular/core/testing';

import { SlidingFigureApiService } from './sliding-figure-api.service';

describe('SlidingFigureApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlidingFigureApiService = TestBed.get(SlidingFigureApiService);
    expect(service).toBeTruthy();
  });
});
