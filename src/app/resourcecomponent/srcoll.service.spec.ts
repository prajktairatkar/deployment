import { TestBed } from '@angular/core/testing';

import { SrcollService } from './srcoll.service';

describe('SrcollService', () => {
  let service: SrcollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrcollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
