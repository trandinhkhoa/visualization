import { Component, OnInit, ElementRef } from '@angular/core';
import { QuickSortService } from 'src/app/services/quick-sort.service';
import { BubbleSortService } from 'src/app/services/bubble-sort.service';
import { MergeSortService } from 'src/app/services/merge-sort.service';

// 1st method
// declare let Chart: any;

@Component({
  selector: 'sort-component',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  // https://stackoverflow.com/questions/64485771/visualising-bubble-sort-using-chart-js
  distanceFromTheEnd = 0;
  currentCursor = 0;

  chart: any;
  timeoutArray : number[] = [];
  isSorting: boolean = false;
  isPaused: boolean = false;
  sortAlgorithm: string = 'Bubble Sort';
  animationArray: any[] = [];
  speed: number = 100;

  constructor(private elementRef: ElementRef,
              private quickSortService: QuickSortService,
              private mergeSortService: MergeSortService,
              private bubbleSortService: BubbleSortService) {
  }

  labels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];

  sort(): void {
    if (this.isPaused) {
      // resume
      this.isPaused = false;
      this.playAnimation(this.animationArray);
    } else {
      this.isSorting = true;
      if (this.sortAlgorithm == "Bubble Sort") {
        this.bubbleSortService.bubbleSort(this.chart.data.datasets[0].data, this.animationArray);
      } else if (this.sortAlgorithm == "Quick Sort") {
        this.quickSortService.quickSort(this.chart.data.datasets[0].data, 0, this.chart.data.datasets[0].data.length - 1, this.animationArray);
      } else if (this.sortAlgorithm == "Merge Sort") {
        this.mergeSortService.mergeSort(this.chart.data.datasets[0].data, this.animationArray);
      }
      console.log("HELLO array = ", {array: this.chart.data.datasets[0].data});
      this.playAnimation(this.animationArray);
    }
  }

  playAnimation(animationArray: any[]) {
    let colors = this.chart.data.datasets[0].backgroundColor;
    let timeout = 0;

    let isLast = false;
    console.log("animation array length = ", animationArray.length);
    for (let i = 0; i < animationArray.length; i++) {
      let animation = animationArray[i];
      // load all positions that need highlighting during this animation
      for (let j = 0; j < animation.highlights.length; j++) {
        colors[animation.highlights[j].index] = animation.highlights[j].color;
      }
      timeout += this.speed;
      isLast = (i == animationArray.length - 1) ? true : false;
      this.update(animationArray, animation.data.slice(0), colors.slice(0), isLast, timeout);
    }
  };

  update(animationArray: any[], data: any[], color: any[], isLast: boolean, timeout: number) {
    this.timeoutArray.push(
      window.setTimeout(() => {
        animationArray.shift();
        this.chart.data.datasets[0].backgroundColor = color;
        this.chart.data.datasets[0].data = data;
        this.isSorting = isLast ? false : true;
        this.chart.update('none');
      }, timeout)
    );
  }

  selectAlgo(algo: string): void {
    this.sortAlgorithm = algo;
  }

  stop(): void {
    this.isSorting = false;
    this.isPaused = true;
    for (let i = 0; i < this.timeoutArray.length; i++) {
      clearTimeout(this.timeoutArray[i]);
    }
  }

  generate(): void {
    this.stop();
    this.isPaused = false;
    this.animationArray.length = 0;
    // https://stackoverflow.com/questions/7486085/copy-array-by-value
    this.chart.data.labels = [...this.labels];
    this.chart.data.datasets[0].data = this.labels.map(() => Math.random());
    this.chart.data.datasets[0].backgroundColor = Array(27).fill('#FFB399');
    this.chart.update('none');
  }

  ngOnInit(): void {
    // 1st method
    // let myChart = new Chart(
    //   document.getElementById('myChart'),
    //   this.config
    // );

    // 2nd method
    // let myChart = new (<any>window).Chart(
    //   document.getElementById('myChart'),
    //   this.config
    // );

    // TODO: wrap chart-js by ng2-chart https://www.digitalocean.com/community/tutorials/angular-chartjs-ng2-charts
    // https://stackoverflow.com/questions/64485771/visualising-bubble-sort-using-chart-js
    // https://stackoverflow.com/questions/41280857/chart-js-failed-to-create-chart-cant-acquire-context-from-the-given-item
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
    let myChart = new (<any>window).Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: [...this.labels],
        datasets: [{
          data: this.labels.map(() => Math.random()),
          // backgroundColor: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF4D4D'],
          backgroundColor: Array(26).fill('#FFB399'),
          borderWidth: 1
        }]
      },
      options: {
        animations: false,
        plugins: {
          legend: {
              display: false,
          }
        },
        maintainAspectRatio: false
      }
    });
    this.chart = myChart;
  }
}
