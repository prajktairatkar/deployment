import { TestBed } from '@angular/core/testing';

import { ResourcecomponentService } from './resourcecomponent.service';

describe('ResourcecomponentService', () => {
  let service: ResourcecomponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcecomponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
