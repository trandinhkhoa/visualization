import { Injectable } from '@angular/core';
import { partition } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  sort(algorithm: string, array: number[]){
    if (algorithm == 'Quick Sort') {
      this.quickSort(array, 0, array.length - 1);
    } else if (algorithm == 'Bubble Sort') {
      this.bubbleSort(array);
    }
  }

  quickSortPartition(array: number[], low: number, high: number): number {
    // TODO: choose a better pivot
    let pivot = high;

    let i = -1;
    for (let j = 0; j < high; j++) {
      if (array[j] < array[pivot]) {
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

  bubbleSort(array: number[]) {
    let swapped = true;
    let countdown = 0;
    do {
      swapped = false;
      for (let i = 0; i < array.length - countdown - 1; i++) {
        if (array[i] > array[i + 1]) {
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          swapped = true;
        }
      }
      countdown++;
    } while (swapped);
  }

}
