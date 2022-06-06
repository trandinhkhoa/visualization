import { Component, OnInit } from '@angular/core';

// 1st method
// declare let Chart: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  bubbleSort(chart: any): void {
    let labels = chart.data.labels;
    let data = chart.data.datasets[0].data;
    let colors = chart.data.datasets[0].backgroundColor;
    let swapped;
    let timeout = 0;
    do {
      swapped = false;
      for (let i = 0; i < data.length; i++) {
        if (data[i] > data[i + 1]) {
          this.swap(labels, i);
          this.swap(data, i);
          this.swap(colors, i);
          timeout += 25;
          this.updateChartDelayed(chart, labels.slice(0), data.slice(0), colors.slice(0), timeout);
          swapped = true;
        }
      }
    } while (swapped);
  }

  swap(arr: number[], i: number): void {
    let tmp = arr[i];
    arr[i] = arr[i + 1];
    arr[i + 1] = tmp;
  }

  updateChartDelayed(chart: any, labels: string[], data:[], colors: string[], timeout: number) {
    setTimeout(() => {
      chart.data.labels = labels;
      chart.data.datasets[0].data = data;
      chart.data.datasets[0].backgroundColor = colors;
      chart.update();
    }, timeout);
  }

  labels = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

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

    // https://stackoverflow.com/questions/64485771/visualising-bubble-sort-using-chart-js
    let myChart = new (<any>window).Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.labels.map(() => Math.random()),
          backgroundColor: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF4D4D'],
          borderWidth: 1
        }]
      }
    });

    setTimeout(() => this.bubbleSort(myChart), 1000);
  }
}
