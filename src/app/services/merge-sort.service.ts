import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MergeSortService {

  animationArray: any[] = [];
  constructor() { }

  mergeSort (array: number[], animationArray: any[]) {
    this.animationArray = animationArray;
    this.mergeSortHelper(array, 0, array.length - 1);

    let highlightArray = [];
    for (let i = 0; i < array.length; i++) {
      highlightArray.push({index: i, color: '#BAEB34'});
    }
    this.animationArray.push(
      {
        data: array.slice(0),
        highlights: highlightArray
      }
    );
  }

  merge(array: number[], low: number, middle: number, high: number) {
    let tempArray: number[] = [];

    let i = low;
    let j = middle + 1;
    while ((i <= middle) && (j <= high)) {
      if (array[i] > array[j]) {
        tempArray.push(array[j]);
        j++;
      } else {
        tempArray.push(array[i]);
        i++;
      }
    }
    if (i > middle) {
      // copy the rest of right
      for (j; j <= high; j++) {
        tempArray.push(array[j]);
      }
    } else {
      for (i; i <= middle; i++) {
        tempArray.push(array[i]);
      }
    }

    // copy tempArray to array
    let h = low;
    for (let k = 0; k < tempArray.length; k++){
      array[h] = tempArray[k];
      h++;
    }
  }

  mergeSortHelper(array: number[], low: number, high: number) {
    if (low >= high)
      return;

    // split
    let middle = Math.round((high - low + 1)/2) - 1 + low;

    let highlightArray = [];
    for (let i = low; i <= high; i++) {
      highlightArray.push({index: i, color: '#3366E6'});
    }
    this.animationArray.push(
      {
        data: array.slice(0),
        highlights: highlightArray.slice(0)
      }
    );

    highlightArray = [];
    for (let i = low; i <= high; i++) {
      highlightArray.push({index: i, color: '#FFB399'});
    }
    this.animationArray.push(
      {
        data: array.slice(0),
        highlights: highlightArray.slice(0)
      }
    );
    this.mergeSortHelper(array, low, middle);
    this.mergeSortHelper(array, middle + 1, high);

    this.merge(array, low, middle, high);

    highlightArray = [];
    for (let i = low; i <= high; i++) {
      highlightArray.push({index: i, color: '#3366E6'});
    }
    this.animationArray.push(
      {
        data: array.slice(0),
        highlights: highlightArray.slice(0)
      }
    );

    highlightArray = [];
    for (let i = low; i <= high; i++) {
      highlightArray.push({index: i, color: '#FFB399'});
    }
    this.animationArray.push(
      {
        data: array.slice(0),
        highlights: highlightArray.slice(0)
      }
    );
  }
}
