import { TestBed } from '@angular/core/testing';

import { CreateDeliveryService } from './create-delivery.service';

describe('CreateDeliveryService', () => {
  let service: CreateDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
