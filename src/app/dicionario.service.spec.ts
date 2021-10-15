import { TestBed } from '@angular/core/testing';

import { DicionarioService } from './dicionario.service';

describe('DicionarioService', () => {
  let service: DicionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DicionarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
