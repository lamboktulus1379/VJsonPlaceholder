import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RepositoryService } from './repository.service';

describe('RepositoryService', () => {
  let service: RepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
