import { Component, OnInit } from '@angular/core';
import { SortComponent } from './sort/sort.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'visualization';
  ngOnInit(): void {
  }
}
