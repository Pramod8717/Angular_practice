import { TestBed } from '@angular/core/testing';

import { PurchaseOrderListService } from './purchaseorderlist.service';

describe('PurchaseOrderListService', () => {
  let service: PurchaseOrderListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseOrderListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
