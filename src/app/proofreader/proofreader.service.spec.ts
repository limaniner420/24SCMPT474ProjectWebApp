import { TestBed } from '@angular/core/testing';

import { ProofreaderService } from './proofreader.service';

describe('ProofreaderService', () => {
  let service: ProofreaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProofreaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
