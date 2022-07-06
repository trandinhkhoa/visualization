import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BubbleSortService {

  constructor() { }

  bubbleSort(array: number[], animationArray: any[]) {
    let swapped = true;
    let countdown = 0;
    do {
      swapped = false;
      for (let i = 0; i < array.length - countdown - 1; i++) {
        animationArray.push(
          {
            data: array.slice(0),
            highlights: [
              { index: i, color: '#3366E6'},
              { index: i + 1, color: '#3366E6'}
            ]
          }
        );

        if (array[i] > array[i + 1]) {
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          swapped = true;
        }

        animationArray.push(
          {
            data: array.slice(0),
            highlights: [
              { index: i, color: '#FFB399'},
              { index: i + 1, color: '#FFB399'}
            ]
          }
        );
      }

      animationArray.push(
        {
          data: array.slice(0),
          highlights: [
            { index: array.length - countdown - 1, color: '#BAEB34'}
          ]
        }
      );

      countdown++;
    } while (swapped);

    let miniArray: any[] = [];
    for (let i = 0; i < array.length - countdown; i++) {
      miniArray.push (
          { index: i, color: '#BAEB34'}
      );
    }
    animationArray.push(
      {
        data: array.slice(0),
        highlights: miniArray
      }
    );
  }
}
