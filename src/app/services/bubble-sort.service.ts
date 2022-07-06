import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BubbleSortService {

  constructor() { }

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
