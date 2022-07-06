import { TestBed } from '@angular/core/testing';

import { BubbleSortService } from './bubble-sort.service';

describe('BubbleSortService', () => {
  let service: BubbleSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BubbleSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should sort ascending', () => {
    let sorted = true;

    for (let iter = 0; iter < 100; iter++) {
      let aRandomArray = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
      service.bubbleSort(aRandomArray);

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
