import { TestBed } from '@angular/core/testing';

import { InternalportalserviceService } from './internalportalservice.service';

describe('InternalportalserviceService', () => {
  let service: InternalportalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalportalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
