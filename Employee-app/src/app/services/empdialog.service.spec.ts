import { TestBed } from '@angular/core/testing';

import { EmpdialogService } from './empdialog.service';

describe('EmpdialogService', () => {
  let service: EmpdialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpdialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
