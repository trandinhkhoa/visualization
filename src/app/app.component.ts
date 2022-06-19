import { Component, OnInit } from '@angular/core';

// 1st method
// declare let Chart: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // https://stackoverflow.com/questions/64485771/visualising-bubble-sort-using-chart-js
  chart: any;
  timeoutArray : number[] = [];
  isSorting: boolean = false;

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
      for (let i = 0; i < data.length - countdown; i++) {
        if (data[i] > data[i + 1]) {
          this.swap(labels, i);
          this.swap(data, i);
          // this.swap(colors, i);
          colors[i] = '#3366E6';
          colors[i+1] = '#3366E6';
          timeout += 30;
          this.updateChartDelayed(chart, labels.slice(0), data.slice(0), colors.slice(0), timeout);
          timeout += 30;
          swapped = true;
          colors[i] = '#FFB399';
          colors[i+1] = '#FFB399';
          this.updateChartDelayed(chart, labels.slice(0), data.slice(0), colors.slice(0), timeout);
        }
      }
      colors[data.length - countdown - 1] = '#baeb34';
      countdown++;
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

  swap(arr: number[], i: number): void {
    let tmp = arr[i];
    arr[i] = arr[i + 1];
    arr[i + 1] = tmp;
  }

  updateChartDelayed(chart: any, labels: string[], data:[], colors: string[], timeout: number) {
    this.timeoutArray.push(
      window.setTimeout(() => {
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].backgroundColor = colors;
        chart.update('none');
      }, timeout)
    );
  }

  labels = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  sort(): void {
    this.bubbleSort(this.chart);
  }

  generate(): void {
    console.log('generating');
    this.stop();
    // https://stackoverflow.com/questions/7486085/copy-array-by-value
    this.chart.data.labels = [...this.labels];
    console.log("HELLO this.chart.data.labels = ", this.chart.data.labels);
    this.chart.data.datasets[0].data = this.labels.map(() => Math.random());
    this.chart.data.datasets[0].backgroundColor = Array(26).fill('#FFB399');
    this.chart.update('none');
  }

  stop(): void {
    this.isSorting = false;

    for (let i = 0; i < this.timeoutArray.length; i++) {
      clearTimeout(this.timeoutArray[i]);
    }

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

    // https://stackoverflow.com/questions/64485771/visualising-bubble-sort-using-chart-js
    let myChart = new (<any>window).Chart('myChart', {
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
