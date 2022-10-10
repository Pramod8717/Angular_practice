import { TestBed } from '@angular/core/testing';

import { ProfileDataService } from './profileData.service';

describe('ProfileGeneralDataService', () => {
  let service: ProfileDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
