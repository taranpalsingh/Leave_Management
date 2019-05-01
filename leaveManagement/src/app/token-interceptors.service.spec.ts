import { TestBed } from '@angular/core/testing';

import { TokenInterceptorsService } from './token-interceptors.service';

describe('TokenInterceptorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenInterceptorsService = TestBed.get(TokenInterceptorsService);
    expect(service).toBeTruthy();
  });
});
