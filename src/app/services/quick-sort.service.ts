import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuickSortService {

  constructor() { }

  quickSortPartition(array: number[], low: number, high: number, animationArray: any[]): number {
    // TODO: choose a better pivot than high
    let pivot = high;
    animationArray.push(
      {
        data: array.slice(0),
        highlights: [
          { index: pivot, color: '#8D32A8'},
        ]
      }
    );

    let i = low - 1;
    for (let j = low; j < high; j++) {
      animationArray.push(
        {
          data: array.slice(0),
          highlights: [
            { index: j, color: '#3366E6'},
          ]
        }
      );

      let isIncremented = false;
      if (array[j] <= array[pivot]) {
        i++;
        isIncremented = true;
        // https://stackoverflow.com/questions/16201656/how-to-swap-two-variables-in-javascript
        [array[i], array[j]] = [array[j], array[i]];

        animationArray[animationArray.length - 1].highlights.push(
            { index: i, color: '#3366E6'}
        )
      }

      animationArray.push(
        {
          data: array.slice(0),
          highlights: [
            { index: j, color: '#FFB399'},
          ]
        }
      );
      if (isIncremented) {
        animationArray[animationArray.length - 1].highlights.push(
            { index: i, color: '#FFB399'},
        )
      }

    }

    [array[pivot], array[i + 1]] = [array[i + 1], array[pivot]];
    animationArray.push(
      {
        data: array.slice(0),
        highlights: [
          { index: pivot, color: '#FFB399'},
        ]
      }
    );

    animationArray.push(
      {
        data: array.slice(0),
        highlights: [
          { index: i+1, color: '#BAEB34'},
        ]
      }
    );

    return i + 1;
  }

  quickSort(array: number[], low: number, high: number, animationArray: any[]) {
    if ((low >= high) || (low < 0)) {
      // TODO: consider whether I should blindly highlight both low and high
      animationArray.push(
        {
          data: array.slice(0),
          highlights: [
            { index: low, color: '#BAEB34'},
            { index: high, color: '#BAEB34'}
          ]
        }
      );
      return;
    }
    // partition
    let pointOfPartition = this.quickSortPartition(array, low, high, animationArray);
    // quicksort
    this.quickSort(array, low, pointOfPartition - 1, animationArray);
    this.quickSort(array, pointOfPartition + 1, high, animationArray);
  }
}
