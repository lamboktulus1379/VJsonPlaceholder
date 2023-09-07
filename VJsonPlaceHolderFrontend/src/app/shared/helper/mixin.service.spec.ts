import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MixinService } from './mixin.service';

describe('MixinService', () => {
  let service: MixinService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(MixinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
