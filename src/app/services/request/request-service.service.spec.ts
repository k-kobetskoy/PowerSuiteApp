/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequestServiceService } from './request-service.service';

describe('Service: RequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestServiceService]
    });
  });

  it('should ...', inject([RequestServiceService], (service: RequestServiceService) => {
    expect(service).toBeTruthy();
  }));
});
