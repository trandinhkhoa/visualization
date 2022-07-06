import { Component, OnInit, ElementRef } from '@angular/core';
import { QuickSortService } from 'src/app/services/quick-sort.service';
import { BubbleSortService } from 'src/app/services/bubble-sort.service';

// 1st method
// declare let Chart: any;

@Component({
  selector: 'sort-component',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  // https://stackoverflow.com/questions/64485771/visualising-bubble-sort-using-chart-js
  chart: any;
  timeoutArray : number[] = [];
  isSorting: boolean = false;
  sortAlgorithm: string = 'Bubble Sort';
  distanceFromTheEnd = 0;
  currentCursor = 0;

  constructor(private elementRef: ElementRef,
              private quickSortService: QuickSortService,
              private bubbleSortService: BubbleSortService) {
  }

  bubbleSort(chart: any): void {
    this.isSorting = true;

    let labels = chart.data.labels;
    let data = chart.data.datasets[0].data;
    let colors = chart.data.datasets[0].backgroundColor;
    let swapped;
    let timeout = 0;
    let countdown = 0;
    do {
      swapped = false;
      for (let i = 0; i < data.length - countdown - this.distanceFromTheEnd - 1; i++) {
        if (data[i] > data[i + 1]) {
          [data[i], data[i + 1]] = [data[i + 1], data[i]];
          colors[i] = '#3366E6';
          colors[i+1] = '#3366E6';
          timeout += 10;
          this.updateChartDelayed(chart, labels.slice(0), data.slice(0), colors.slice(0), timeout, i);
          timeout += 10;
          swapped = true;
          colors[i] = '#FFB399';
          colors[i+1] = '#FFB399';
          this.updateChartDelayed(chart, labels.slice(0), data.slice(0), colors.slice(0), timeout, i);
        } else {
          colors[i] = '#3366E6';
          colors[i+1] = '#3366E6';
          timeout += 10;
          this.updateChartDelayed(chart, labels.slice(0), data.slice(0), colors.slice(0), timeout, i);
          timeout += 10;
          colors[i] = '#FFB399';
          colors[i+1] = '#FFB399';
          this.updateChartDelayed(chart, labels.slice(0), data.slice(0), colors.slice(0), timeout, i);
        }
      }
      colors[data.length - countdown - this.distanceFromTheEnd - 1] = '#baeb34';
      countdown++;
      this.timeoutArray.push(
        window.setTimeout(() => {
          this.distanceFromTheEnd++;
          chart.data.datasets[0].backgroundColor = colors;
          chart.update('none');
        }, timeout)
      );
    } while (swapped);

    this.timeoutArray.push(
      window.setTimeout(() => {
        for (let i = 0; i < data.length - countdown; i++) {
          colors[i] = '#baeb34';
          chart.data.datasets[0].backgroundColor = colors;
        }
        chart.update('none');
        this.isSorting = false;
      }, timeout)
    );
  }

  updateChartDelayed(chart: any, labels: string[], data:[], colors: string[], timeout: number, cursor: number) {
    this.timeoutArray.push(
      window.setTimeout(() => {
        this.currentCursor = cursor;
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].backgroundColor = colors;
        chart.update('none');
      }, timeout)
    );
  }

  // labels = ['0','1','2','3','V','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  labels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];

  sort(): void {
    if (this.sortAlgorithm == "Bubble Sort") {
      this.bubbleSort(this.chart);
    } else {
      this.quickSortService.quickSort(this.chart.data.datasets[0].data, 0, this.chart.data.datasets[0].data.length - 1);
      this.chart.update('none');
    }
  }

  generate(): void {
    this.distanceFromTheEnd = 0;
    console.log('generating');
    this.stop();
    // https://stackoverflow.com/questions/7486085/copy-array-by-value
    this.chart.data.labels = [...this.labels];
    this.chart.data.datasets[0].data = this.labels.map(() => Math.random());
    this.chart.data.datasets[0].backgroundColor = Array(26).fill('#FFB399');
    this.chart.update('none');
  }

  stop(): void {
    this.isSorting = false;
    for (let i = 0; i < this.chart.data.datasets[0].data.length - this.distanceFromTheEnd - 1; i++) {
      this.chart.data.datasets[0].backgroundColor[i]= '#FFB399';
    }
    this.chart.data.datasets[0].backgroundColor[this.currentCursor]= '#3366E6';
    this.chart.data.datasets[0].backgroundColor[this.currentCursor + 1]= '#3366E6';
    this.chart.update('none');
    for (let i = 0; i < this.timeoutArray.length; i++) {
      clearTimeout(this.timeoutArray[i]);
    }
  }

  selectAlgo(algo: string): void {
    this.sortAlgorithm = algo;
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
      }
      // maintainAspectRatio: false
      }
    });
    this.chart = myChart;
  }
}
