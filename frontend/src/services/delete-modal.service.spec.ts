import { TestBed } from '@angular/core/testing';

import { DeleteModal } from './delete-modal';

describe('DeleteModal', () => {
  let service: DeleteModal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteModal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
