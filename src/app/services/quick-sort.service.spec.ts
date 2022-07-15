import { TestBed } from '@angular/core/testing';

import { QuickSortService } from './quick-sort.service';

describe('QuickSortService', () => {
  let service: QuickSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort ascending', () => {
    let sorted = true;

    for (let iter = 0; iter < 100; iter++) {
      let aRandomArray = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
      service.quickSort(aRandomArray, 0, aRandomArray.length - 1, []);

      for (let i = 0; i < aRandomArray.length - 1; i++) {
        if (aRandomArray[i] > aRandomArray[i + 1]) {
          sorted = false;
          break;
        }
      }
    }

    expect(sorted).toBeTruthy();
  });
});
