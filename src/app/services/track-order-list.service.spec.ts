import { TestBed } from '@angular/core/testing';

import { TrackOrderListService } from './track-order-list.service';

describe('TrackOrderListService', () => {
  let service: TrackOrderListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackOrderListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
