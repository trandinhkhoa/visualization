import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuickSortService {

  constructor() { }

  quickSortPartition(array: number[], low: number, high: number): number {
    // TODO: choose a better pivot
    let pivot = high;

    let i = -1;
    for (let j = 0; j < high; j++) {
      if (array[j] <= array[pivot]) {
        i++;
        // https://stackoverflow.com/questions/16201656/how-to-swap-two-variables-in-javascript
        [array[i], array[j]] = [array[j], array[i]];

      }
    }
    [array[pivot], array[i + 1]] = [array[i + 1], array[pivot]];

    return i + 1;
  }

  quickSort(array: number[], low: number, high: number) {
    if ((low >= high) || (low < 0)) {
      return;
    }
    // partition
    let pointOfPartition = this.quickSortPartition(array, low, high);
    // quicksort
    this.quickSort(array, low, pointOfPartition - 1);
    this.quickSort(array, pointOfPartition + 1, high);
  }
}
