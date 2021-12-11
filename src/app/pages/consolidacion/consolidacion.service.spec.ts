import { TestBed } from '@angular/core/testing';

import { ConsolidacionService } from './consolidacion.service';

describe('ConsolidacionService', () => {
  let service: ConsolidacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsolidacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
