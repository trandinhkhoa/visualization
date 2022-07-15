import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';

import { SortComponent } from './sort.component';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [MatMenuModule],
    declarations: [SortComponent],
  }).compileComponents();
});

// describe('SortComponent', () => {
//   let component: SortComponent;
//   let fixture: ComponentFixture<SortComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ SortComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SortComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });
// });
