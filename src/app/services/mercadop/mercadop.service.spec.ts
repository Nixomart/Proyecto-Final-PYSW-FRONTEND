import { TestBed } from '@angular/core/testing';

import { MercadopService } from './mercadop.service';

describe('MercadopService', () => {
  let service: MercadopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MercadopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
