import { TestBed } from '@angular/core/testing';

import { RinnoviService } from './rinnovi.service';

describe('RinnoviService', () => {
  let service: RinnoviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RinnoviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
