import { TestBed } from '@angular/core/testing';

import { MergeSortService } from './merge-sort.service';

describe('MergeSortService', () => {
  let service: MergeSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MergeSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort ascending', () => {
    let sorted = true;

    for (let iter = 0; iter < 100; iter++) {
      let aRandomArray = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
      service.mergeSort(aRandomArray, []);

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
