import { TestBed } from '@angular/core/testing';

import { QuickSortService } from './quick-sort.service';
import { MergeSortService } from './merge-sort.service';
import { BubbleSortService } from './bubble-sort.service';

describe('QuickSortService', () => {
  let quickSortService: QuickSortService;
  let bubbleSortService: BubbleSortService;
  let mergeSortService: MergeSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    quickSortService = TestBed.inject(QuickSortService);
    bubbleSortService = TestBed.inject(BubbleSortService);
    mergeSortService = TestBed.inject(MergeSortService);
  });

  it('should be created', () => {
    expect(quickSortService).toBeTruthy();
    expect(mergeSortService).toBeTruthy();
    expect(bubbleSortService).toBeTruthy();
  });

  it('should quick sort ascending', () => {
    let sorted = true;

    for (let iter = 0; iter < 100; iter++) {
      let aRandomArray = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
      quickSortService.quickSort(aRandomArray, 0, aRandomArray.length - 1, []);

      for (let i = 0; i < aRandomArray.length - 1; i++) {
        if (aRandomArray[i] > aRandomArray[i + 1]) {
          sorted = false;
          break;
        }
      }
    }

    expect(sorted).toBeTruthy();
  });

  it('should bubble sort ascending', () => {
    let sorted = true;

    for (let iter = 0; iter < 100; iter++) {
      let aRandomArray = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
      bubbleSortService.bubbleSort(aRandomArray, []);

      for (let i = 0; i < aRandomArray.length - 1; i++) {
        if (aRandomArray[i] > aRandomArray[i + 1]) {
          sorted = false;
          break;
        }
      }
    }

    expect(sorted).toBeTruthy();
  });

  it('should merge sort ascending', () => {
    let sorted = true;

    for (let iter = 0; iter < 100; iter++) {
      let aRandomArray = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
      mergeSortService.mergeSort(aRandomArray, []);

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
